import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { Database, Json } from "@/lib/supabase/database.types";

type ServiceConfigRow =
  Database["public"]["Tables"]["project_service_configs"]["Row"];

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

const VALID_AI_SERVICES = [
  "openai_dalle3",
  "replicate_flux",
  "google_nano_banana",
] as const;

type AiService = (typeof VALID_AI_SERVICES)[number];

function isValidAiService(value: unknown): value is AiService {
  return (
    typeof value === "string" &&
    VALID_AI_SERVICES.includes(value as AiService)
  );
}

// GET /api/projects/:projectId/service-configs
// List all per-service fine-tuning configs for a project
export async function GET(
  _request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    // Verify project exists and belongs to the current user
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

    const { data: configs, error } = (await supabaseAdmin
      .from("project_service_configs")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true })) as {
      data: ServiceConfigRow[] | null;
      error: { message: string } | null;
    };

    // Graceful degradation if table doesn't exist yet
    if (error) {
      console.error(
        "[ServiceConfigs API] GET query error:",
        error.message
      );
      return NextResponse.json({ success: true, configs: [] });
    }

    return NextResponse.json({
      success: true,
      configs: configs ?? [],
    });
  } catch (error) {
    // Graceful degradation - return empty array on unexpected errors
    console.error("[ServiceConfigs API] GET error:", error);
    return NextResponse.json({ success: true, configs: [] });
  }
}

// POST /api/projects/:projectId/service-configs
// Upsert a per-service fine-tuning config
export async function POST(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    // Parse and validate request body
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const ai_service = body.ai_service_id ?? body.ai_service;
    const { use_basic_params, custom_params } = body;

    // Validate ai_service_id
    if (!ai_service) {
      return NextResponse.json(
        { success: false, error: "ai_service_id is required" },
        { status: 400 }
      );
    }

    if (!isValidAiService(ai_service)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid ai_service_id. Must be one of: ${VALID_AI_SERVICES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validate use_basic_params if provided
    if (
      use_basic_params !== undefined &&
      typeof use_basic_params !== "boolean"
    ) {
      return NextResponse.json(
        { success: false, error: "use_basic_params must be a boolean" },
        { status: 400 }
      );
    }

    // Validate custom_params if provided (must be object or null)
    if (
      custom_params !== undefined &&
      custom_params !== null &&
      typeof custom_params !== "object"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "custom_params must be a JSON object or null",
        },
        { status: 400 }
      );
    }

    // Verify project exists and belongs to the current user
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

    // Upsert the service config
    const now = new Date().toISOString();
    const upsertData = {
      project_id: projectId,
      ai_service_id: ai_service as AiService,
      use_basic_params:
        use_basic_params !== undefined ? (use_basic_params as boolean) : true,
      custom_params:
        custom_params !== undefined
          ? (custom_params as Json | null)
          : null,
      updated_at: now,
    };

    const { data: config, error: upsertError } = (await supabaseAdmin
      .from("project_service_configs")
      .upsert(upsertData, {
        onConflict: "project_id,ai_service_id",
      })
      .select()
      .single()) as {
      data: ServiceConfigRow | null;
      error: { message: string } | null;
    };

    if (upsertError) {
      console.error(
        "[ServiceConfigs API] Upsert error:",
        upsertError.message
      );

      // Check for missing table error
      if (
        upsertError.message.includes("schema cache") ||
        upsertError.message.includes("project_service_configs")
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Service configs not available yet. Please run the project_service_configs migration.",
          },
          { status: 503 }
        );
      }

      throw new Error(upsertError.message);
    }

    return NextResponse.json(
      { success: true, config },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[ServiceConfigs API] POST error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
