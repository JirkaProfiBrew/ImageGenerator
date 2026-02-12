import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

export async function PATCH(
  request: Request,
  { params }: { params: { projectId: string; sampleId: string } }
) {
  try {
    const { projectId, sampleId } = params;

    // Verify project belongs to user
    const { data: project, error: projectError } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .eq("user_id", MOCK_USER_ID)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    // Verify sample exists and belongs to this project
    const { data: sample, error: sampleError } = await supabaseAdmin
      .from("samples")
      .select("*")
      .eq("id", sampleId)
      .eq("project_id", projectId)
      .single();

    if (sampleError || !sample) {
      return NextResponse.json(
        { success: false, error: "Sample not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { selected_service } = body;

    if (!selected_service) {
      return NextResponse.json(
        { success: false, error: "selected_service is required" },
        { status: 400 }
      );
    }

    // Update sample: lock it and set the selected service
    const { error: updateSampleError } = await supabaseAdmin
      .from("samples")
      .update({
        is_locked: true,
        selected_service,
      })
      .eq("id", sampleId);

    if (updateSampleError) throw new Error(updateSampleError.message);

    // Update project: mark as locked with the chosen sample and service
    // Note: "locked" status requires a DB migration to add to the status check constraint.
    // Using "queued" as the nearest valid status until the migration is applied.
    // TODO: Add "locked" to projects.status CHECK constraint and database.types.ts
    const { data: updatedProject, error: updateProjectError } = await supabaseAdmin
      .from("projects")
      .update({
        status: "queued" as const,
        locked_sample_id: sampleId,
        ai_service: selected_service,
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId)
      .select()
      .single();

    if (updateProjectError) throw new Error(updateProjectError.message);

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
