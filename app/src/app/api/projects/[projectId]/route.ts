import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

export async function GET(
  _request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    const { data: project, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .eq("user_id", MOCK_USER_ID)
      .single();

    if (error || !project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    // Fetch samples for this project
    const { data: samples } = await supabaseAdmin
      .from("samples")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    return NextResponse.json({
      success: true,
      project,
      samples: samples ?? [],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    // Fetch the project first to verify ownership and status
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .eq("user_id", MOCK_USER_ID)
      .single() as { data: ProjectRow | null; error: { message: string } | null };

    if (fetchError || !existing) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    // Allow editing draft and queued (locked) projects
    const editableStatuses = ["draft", "queued"];
    if (!editableStatuses.includes(existing.status)) {
      return NextResponse.json(
        { success: false, error: "Only draft or locked projects can be updated" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Build update payload with only provided fields
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    if (body.name !== undefined) updateData.name = body.name;
    if (body.base_prompt !== undefined) updateData.base_prompt = body.base_prompt;
    if (body.mode !== undefined) updateData.mode = body.mode;
    if (body.style !== undefined) updateData.style = body.style;
    if (body.background !== undefined) updateData.background = body.background;
    if (body.default_ratio !== undefined) updateData.default_ratio = body.default_ratio;

    const { data: project, error } = await supabaseAdmin
      .from("projects")
      .update(updateData)
      .eq("id", projectId)
      .eq("user_id", MOCK_USER_ID)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true, project });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    const { error } = await supabaseAdmin
      .from("projects")
      .delete()
      .eq("id", projectId)
      .eq("user_id", MOCK_USER_ID);

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
