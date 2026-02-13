import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

type ServiceConfigRow =
  Database["public"]["Tables"]["project_service_configs"]["Row"];

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

const VALID_AI_SERVICES = [
  "openai_dalle3",
  "replicate_flux",
  "google_nano_banana",
] as const;

type AiService = (typeof VALID_AI_SERVICES)[number];

// GET /api/projects/:projectId/service-configs/:service
// Get a single service config for a project
export async function GET(
  _request: Request,
  { params }: { params: { projectId: string; service: string } }
) {
  try {
    const { projectId, service } = params;

    if (!VALID_AI_SERVICES.includes(service as AiService)) {
      return NextResponse.json(
        { success: false, error: `Invalid service. Must be one of: ${VALID_AI_SERVICES.join(", ")}` },
        { status: 400 }
      );
    }

    // Verify project exists and belongs to user
    const { data: project, error: projectError } = (await supabaseAdmin
      .from("projects")
      .select("id")
      .eq("id", projectId)
      .eq("user_id", MOCK_USER_ID)
      .single()) as {
      data: { id: string } | null;
      error: { message: string } | null;
    };

    if (projectError || !project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const aiService = service as AiService;

    const { data: config, error } = (await supabaseAdmin
      .from("project_service_configs")
      .select("*")
      .eq("project_id", projectId)
      .eq("ai_service_id", aiService)
      .single()) as {
      data: ServiceConfigRow | null;
      error: { message: string; code?: string } | null;
    };

    // PGRST116 = row not found - that's fine, return null
    if (error && error.code !== "PGRST116") {
      console.error("[ServiceConfigs API] GET single error:", error.message);
      return NextResponse.json({ success: true, config: null });
    }

    return NextResponse.json({
      success: true,
      config: config ?? null,
    });
  } catch (error) {
    console.error("[ServiceConfigs API] GET single error:", error);
    return NextResponse.json({ success: true, config: null });
  }
}

// DELETE /api/projects/:projectId/service-configs/:service
// Delete a service config (reset to basic params)
export async function DELETE(
  _request: Request,
  { params }: { params: { projectId: string; service: string } }
) {
  try {
    const { projectId, service } = params;

    if (!VALID_AI_SERVICES.includes(service as AiService)) {
      return NextResponse.json(
        { success: false, error: `Invalid service. Must be one of: ${VALID_AI_SERVICES.join(", ")}` },
        { status: 400 }
      );
    }

    // Verify project exists and belongs to user
    const { data: project, error: projectError } = (await supabaseAdmin
      .from("projects")
      .select("id")
      .eq("id", projectId)
      .eq("user_id", MOCK_USER_ID)
      .single()) as {
      data: { id: string } | null;
      error: { message: string } | null;
    };

    if (projectError || !project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const aiService = service as AiService;

    const { error } = await supabaseAdmin
      .from("project_service_configs")
      .delete()
      .eq("project_id", projectId)
      .eq("ai_service_id", aiService);

    if (error) {
      console.error("[ServiceConfigs API] DELETE error:", error.message);
      // Graceful - if table missing or row not found, still return success
      return NextResponse.json({ success: true, message: "Config reset to defaults" });
    }

    return NextResponse.json({ success: true, message: "Config deleted" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[ServiceConfigs API] DELETE error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
