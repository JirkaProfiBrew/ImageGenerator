import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

export async function PATCH(
  _request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    // Get current project
    const { data: project, error: fetchError } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .eq("user_id", MOCK_USER_ID)
      .single() as { data: ProjectRow | null; error: { message: string } | null };

    if (fetchError || !project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    if (project.status !== "queued") {
      return NextResponse.json(
        { success: false, error: "Project is not locked" },
        { status: 400 }
      );
    }

    // Unlock: revert to draft, clear locked_sample_id
    // Keep ai_service_id and consistency_seed as reference
    const { data: updatedProject, error: updateError } = await supabaseAdmin
      .from("projects")
      .update({
        status: "draft" as const,
        locked_sample_id: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId)
      .eq("user_id", MOCK_USER_ID)
      .select()
      .single();

    if (updateError) throw new Error(updateError.message);

    // Unlock the previously locked sample
    if (project.locked_sample_id) {
      await supabaseAdmin
        .from("samples")
        .update({
          is_locked: false,
          locked_ai_service_id: null,
        })
        .eq("id", project.locked_sample_id);
    }

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
