import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

export async function GET() {
  try {
    const { data: projects, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("user_id", MOCK_USER_ID)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true, projects: projects ?? [] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "name is required" },
        { status: 400 }
      );
    }

    const { data: project, error } = await supabaseAdmin
      .from("projects")
      .insert({
        user_id: MOCK_USER_ID,
        name,
        base_prompt: null,
        ai_service: null,
        default_ratio: "1:1",
        mode: "generation" as const,
        style: "realistic",
        background: "white",
        quality_level: "standard" as const,
        creativity_level: "medium" as const,
        status: "draft" as const,
        settings: {},
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
