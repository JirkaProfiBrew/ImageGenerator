import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import {
  generateContext,
  CONTEXT_TEMPLATES,
} from "@/lib/ai/openai-text";

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

// GET /api/ai/generate-context - Get available templates
export async function GET() {
  return NextResponse.json({
    success: true,
    templates: CONTEXT_TEMPLATES.map((t) => ({
      id: t.id,
      name: t.name,
      description: t.description,
    })),
  });
}

// POST /api/ai/generate-context - Generate context with GPT-4o-mini
export async function POST(request: NextRequest) {
  try {
    let body: { template?: string; prompt?: string; project_id?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { template, prompt, project_id } = body;

    if (!template || !prompt) {
      return NextResponse.json(
        { success: false, error: "template and prompt are required" },
        { status: 400 }
      );
    }

    if (!project_id) {
      return NextResponse.json(
        { success: false, error: "project_id is required" },
        { status: 400 }
      );
    }

    // Verify project exists and belongs to user
    const { data: project, error: projectError } = (await supabaseAdmin
      .from("projects")
      .select("id")
      .eq("id", project_id)
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

    // TODO: Check & deduct credits when credit system is wired up
    console.log("[Context Gen] Generating with template:", template);

    const result = await generateContext({
      template,
      userPrompt: prompt,
      maxTokens: 1500,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Generation failed" },
        { status: 500 }
      );
    }

    // Generate filename from prompt
    const timestamp = Date.now();
    const sanitizedPrompt = prompt
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .substring(0, 30)
      .replace(/-+$/, "");
    const filename = `ai-${sanitizedPrompt}-${timestamp}.txt`;

    return NextResponse.json({
      success: true,
      generated_text: result.generatedText,
      tokens_used: result.tokensUsed,
      cost_credits: 1,
      filename,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    console.error("[Context Gen] Error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
