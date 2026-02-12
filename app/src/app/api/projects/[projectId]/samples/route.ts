import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { generateWithDallE3 } from "@/lib/ai/openai";
import { generateWithFluxPro } from "@/lib/ai/replicate";
import { generateWithNanoBananaPro } from "@/lib/ai/google";
import type { Database, Json } from "@/lib/supabase/database.types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

export async function POST(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    // Fetch the project to get base_prompt
    const { data: project, error: projectError } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .eq("user_id", MOCK_USER_ID)
      .single() as { data: ProjectRow | null; error: { message: string } | null };

    if (projectError || !project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { scene_description, selected_services } = body;

    if (!scene_description) {
      return NextResponse.json(
        { success: false, error: "scene_description is required" },
        { status: 400 }
      );
    }

    const services = selected_services || {
      dalle3: true,
      flux: true,
      nanoBanana: true,
    };

    // Combine base prompt with scene description
    const fullPrompt = project.base_prompt
      ? `${project.base_prompt}. Scene: ${scene_description}`
      : scene_description;

    // Generate with selected AI services in parallel
    const apiCalls: Promise<{
      key: string;
      result: { success: boolean; imageUrl?: string; error?: string };
    }>[] = [];

    if (services.dalle3) {
      apiCalls.push(
        generateWithDallE3(fullPrompt, {
          size: "1024x1024",
          quality: "standard",
          style: "vivid",
        }).then((result) => ({ key: "dalle3", result }))
      );
    }

    if (services.flux) {
      apiCalls.push(
        generateWithFluxPro(fullPrompt, {
          aspectRatio: "1:1",
          outputFormat: "png",
          outputQuality: 90,
        }).then((result) => ({ key: "flux", result }))
      );
    }

    if (services.nanoBanana) {
      apiCalls.push(
        generateWithNanoBananaPro(fullPrompt).then((result) => ({
          key: "nanoBanana",
          result,
        }))
      );
    }

    if (apiCalls.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one AI service must be selected" },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    const apiResults = await Promise.all(apiCalls);
    const totalTime = Math.round((Date.now() - startTime) / 1000);

    // Build generated images array
    const generatedImages: { [key: string]: Json | undefined }[] = [];

    for (const { key, result } of apiResults) {
      if (key === "dalle3") {
        generatedImages.push({
          aiService: "openai_dalle3",
          displayName: "DALL-E 3",
          imageUrl: result.success ? result.imageUrl : null,
          creditCost: 15,
          generationTime: totalTime,
          error: result.success ? undefined : result.error,
        });
      } else if (key === "flux") {
        generatedImages.push({
          aiService: "replicate_flux",
          displayName: "Flux Pro",
          imageUrl: result.success ? result.imageUrl : null,
          creditCost: 10,
          generationTime: totalTime,
          error: result.success ? undefined : result.error,
        });
      } else if (key === "nanoBanana") {
        generatedImages.push({
          aiService: "google_nano_banana",
          displayName: "Nano Banana Pro",
          imageUrl: result.success ? result.imageUrl : null,
          creditCost: 6,
          generationTime: totalTime,
          error: result.success ? undefined : result.error,
        });
      }
    }

    // Save sample to database
    const { data: sample, error: sampleError } = await supabaseAdmin
      .from("samples")
      .insert({
        project_id: projectId,
        scene_description,
        generated_images: generatedImages,
      })
      .select()
      .single();

    if (sampleError) throw new Error(sampleError.message);

    return NextResponse.json(
      { success: true, sample },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sample generation error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
