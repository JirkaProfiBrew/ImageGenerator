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

    // Project parameter settings
    const uiStyle = project.style || "realistic";
    const qualityLevel = project.quality_level || "standard";
    const creativityLevel = project.creativity_level || "medium";

    // Map aspect ratio for DALL-E size
    const dalleSize: "1024x1024" | "1024x1792" | "1792x1024" =
      project.default_ratio === "9:16"
        ? "1024x1792"
        : project.default_ratio === "16:9"
          ? "1792x1024"
          : "1024x1024";

    // Map aspect ratio for Flux
    const fluxRatio = (project.default_ratio || "1:1") as
      | "1:1"
      | "16:9"
      | "9:16"
      | "4:3"
      | "3:2";

    // Generate with selected AI services in parallel, each with independent timing
    interface TimedResult {
      key: string;
      result: { success: boolean; imageUrl?: string; error?: string };
      time: number;
    }

    const apiCalls: Promise<TimedResult>[] = [];

    if (services.dalle3) {
      apiCalls.push(
        (async () => {
          const t = Date.now();
          const result = await generateWithDallE3(fullPrompt, {
            size: dalleSize,
            uiStyle,
            qualityLevel,
            creativityLevel,
          });
          const time = Math.round((Date.now() - t) / 1000);
          console.log(`[Samples] DALL-E 3 completed in ${time}s`);
          return { key: "dalle3", result, time };
        })()
      );
    }

    if (services.flux) {
      apiCalls.push(
        (async () => {
          const t = Date.now();
          const result = await generateWithFluxPro(fullPrompt, {
            aspectRatio: fluxRatio,
            outputFormat: "png",
            outputQuality: 90,
            uiStyle,
            qualityLevel,
            creativityLevel,
            seed: project.consistency_seed,
          });
          const time = Math.round((Date.now() - t) / 1000);
          console.log(`[Samples] Flux Pro completed in ${time}s`);
          return { key: "flux", result, time };
        })()
      );
    }

    if (services.nanoBanana) {
      apiCalls.push(
        (async () => {
          const t = Date.now();
          const result = await generateWithNanoBananaPro(fullPrompt, {
            uiStyle,
            qualityLevel,
            creativityLevel,
          });
          const time = Math.round((Date.now() - t) / 1000);
          console.log(`[Samples] Nano Banana Pro completed in ${time}s`);
          return { key: "nanoBanana", result, time };
        })()
      );
    }

    if (apiCalls.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one AI service must be selected" },
        { status: 400 }
      );
    }

    const apiResults = await Promise.all(apiCalls);

    // Build generated images array with individual timings
    const generatedImages: { [key: string]: Json | undefined }[] = [];

    for (const { key, result, time } of apiResults) {
      if (key === "dalle3") {
        generatedImages.push({
          aiService: "openai_dalle3",
          displayName: "DALL-E 3",
          imageUrl: result.success ? result.imageUrl : null,
          creditCost: 15,
          generationTime: time,
          error: result.success ? undefined : result.error,
        });
      } else if (key === "flux") {
        generatedImages.push({
          aiService: "replicate_flux",
          displayName: "Flux Pro",
          imageUrl: result.success ? result.imageUrl : null,
          creditCost: 10,
          generationTime: time,
          error: result.success ? undefined : result.error,
        });
      } else if (key === "nanoBanana") {
        generatedImages.push({
          aiService: "google_nano_banana",
          displayName: "Nano Banana Pro",
          imageUrl: result.success ? result.imageUrl : null,
          creditCost: 6,
          generationTime: time,
          error: result.success ? undefined : result.error,
        });
      }
    }

    const totalTime = generatedImages.reduce(
      (sum, img) => sum + ((img.generationTime as number) || 0),
      0
    );
    console.log(
      `[Samples] Total: ${totalTime}s across ${generatedImages.length} services`
    );

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
