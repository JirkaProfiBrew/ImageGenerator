import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { generateWithDallE3 } from "@/lib/ai/openai";
import { generateWithFluxPro } from "@/lib/ai/replicate";
import { generateWithNanoBananaPro } from "@/lib/ai/google";
import {
  getFinalParameters,
  type QualityLevel,
  type CreativityLevel,
} from "@/lib/ai/parameter-mapper";
import {
  loadProjectContext,
  buildContextPromptSuffix,
  buildGeminiImageParts,
} from "@/lib/ai/context-helpers";
import type { Database, Json } from "@/lib/supabase/database.types";
import type { ProjectContext } from "@/lib/types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

export async function POST(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    // Fetch the project to get base_prompt + context_config
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
    const qualityLevel = (project.quality_level || "standard") as QualityLevel;
    const creativityLevel = (project.creativity_level || "medium") as CreativityLevel;

    // --- Load project context ---
    const contextConfig = project.context_config as ProjectContext | undefined;
    const { referenceImages, documentText } = loadProjectContext(contextConfig);
    console.log(
      `[Samples] Context loaded: ${referenceImages.length} images, ${documentText.length} chars of text`
    );

    // Build context suffix for text-only services (DALL-E, Flux)
    const contextSuffix = buildContextPromptSuffix(documentText, referenceImages.length);
    const promptWithContext = contextSuffix ? fullPrompt + contextSuffix : fullPrompt;

    // Build Gemini-compatible image parts for Nano Banana
    const geminiImageParts = buildGeminiImageParts(referenceImages);

    // --- Load service configs ---
    type ServiceConfigMap = Record<string, {
      use_basic_params: boolean;
      custom_params: Record<string, unknown> | null;
    }>;
    const serviceConfigMap: ServiceConfigMap = {};

    try {
      type ServiceConfigRow = Database["public"]["Tables"]["project_service_configs"]["Row"];
      const { data: configs } = (await supabaseAdmin
        .from("project_service_configs")
        .select("*")
        .eq("project_id", projectId)) as { data: ServiceConfigRow[] | null; error: unknown };

      if (configs) {
        for (const cfg of configs) {
          serviceConfigMap[cfg.ai_service_id] = {
            use_basic_params: cfg.use_basic_params,
            custom_params: cfg.custom_params as Record<string, unknown> | null,
          };
        }
      }
    } catch {
      // Graceful - service configs are optional
    }

    const configCount = Object.keys(serviceConfigMap).length;
    console.log(`[Samples] Service configs loaded: ${configCount} custom configs`);

    // Map aspect ratio for DALL-E size
    // DALL-E 3 only supports 1:1, 16:9, 9:16. Convert 4:3 → 16:9.
    const dalleRatio = project.default_ratio === "4:3" ? "16:9" : (project.default_ratio || "1:1");
    const dalleSize: "1024x1024" | "1024x1792" | "1792x1024" =
      dalleRatio === "9:16"
        ? "1024x1792"
        : dalleRatio === "16:9"
          ? "1792x1024"
          : "1024x1024";

    if (project.default_ratio === "4:3") {
      console.log("[Samples] DALL-E ratio 4:3 → 16:9 (landscape fallback)");
    }

    // Map aspect ratio for Flux (supports 4:3 natively)
    const fluxRatio = (project.default_ratio || "1:1") as
      | "1:1"
      | "16:9"
      | "9:16"
      | "4:3";

    // Generate with selected AI services in parallel
    interface TimedResult {
      key: string;
      result: { success: boolean; imageUrl?: string; error?: string };
      time: number;
    }

    const apiCalls: Promise<TimedResult>[] = [];

    // --- DALL-E 3 ---
    if (services.dalle3) {
      apiCalls.push(
        (async () => {
          const t = Date.now();
          const finalParams = getFinalParameters(
            serviceConfigMap["openai_dalle3"] ?? null,
            uiStyle, qualityLevel, creativityLevel,
            "openai_dalle3"
          );
          const result = await generateWithDallE3(promptWithContext, {
            size: dalleSize,
            quality: (finalParams.quality as "standard" | "hd") || undefined,
            style: (finalParams.style as "natural" | "vivid") || undefined,
            // Still pass UI params as fallback for basic mapping
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

    // --- Flux Pro ---
    if (services.flux) {
      apiCalls.push(
        (async () => {
          const t = Date.now();
          const finalParams = getFinalParameters(
            serviceConfigMap["replicate_flux"] ?? null,
            uiStyle, qualityLevel, creativityLevel,
            "replicate_flux",
            project.consistency_seed
          );
          const result = await generateWithFluxPro(promptWithContext, {
            aspectRatio: fluxRatio,
            outputFormat: "png",
            outputQuality: 90,
            guidance: finalParams.guidance as number | undefined,
            num_inference_steps: finalParams.num_inference_steps as number | undefined,
            interval: finalParams.interval as number | undefined,
            prompt_upsampling: finalParams.prompt_upsampling as boolean | undefined,
            safety_tolerance: finalParams.safety_tolerance as number | undefined,
            seed: (finalParams.seed as number | undefined) ?? project.consistency_seed,
            // Still pass UI params as fallback for basic mapping
            uiStyle,
            qualityLevel,
            creativityLevel,
          });
          const time = Math.round((Date.now() - t) / 1000);
          console.log(`[Samples] Flux Pro completed in ${time}s`);
          return { key: "flux", result, time };
        })()
      );
    }

    // --- Nano Banana Pro ---
    if (services.nanoBanana) {
      apiCalls.push(
        (async () => {
          const t = Date.now();
          const finalParams = getFinalParameters(
            serviceConfigMap["google_nano_banana"] ?? null,
            uiStyle, qualityLevel, creativityLevel,
            "google_nano_banana"
          );
          const result = await generateWithNanoBananaPro(fullPrompt, {
            temperature: finalParams.temperature as number | undefined,
            imageSize: finalParams.imageSize as "1K" | "2K" | "4K" | undefined,
            thinkingLevel: finalParams.thinkingLevel as "minimal" | "low" | "medium" | "high" | undefined,
            topP: finalParams.topP as number | undefined,
            topK: finalParams.topK as number | undefined,
            enableSearch: finalParams.enable_search as boolean | undefined,
            // Reference images and text context (Gemini multimodal)
            referenceImageParts: geminiImageParts,
            contextText: documentText || undefined,
            // Still pass UI params as fallback for basic mapping
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
