import Replicate from "replicate";
import {
  getFluxProParameters,
  type QualityLevel,
  type CreativityLevel,
} from "./parameter-mapper";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export interface FluxGenerateOptions {
  aspectRatio?: "1:1" | "16:9" | "9:16" | "4:3" | "3:2";
  outputFormat?: "png" | "jpg" | "webp";
  outputQuality?: number;
  guidance?: number;
  num_inference_steps?: number;
  interval?: number;
  prompt_upsampling?: boolean;
  safety_tolerance?: number;
  seed?: number | null;
  uiStyle?: string;
  qualityLevel?: QualityLevel;
  creativityLevel?: CreativityLevel;
}

export interface FluxResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export async function generateWithFluxPro(
  prompt: string,
  options?: FluxGenerateOptions
): Promise<FluxResult> {
  try {
    let guidance = options?.guidance ?? 7.5;
    let numSteps = options?.num_inference_steps ?? 25;
    let seed = options?.seed ?? undefined;

    if (options?.uiStyle && options?.qualityLevel && options?.creativityLevel) {
      const params = getFluxProParameters(
        options.uiStyle,
        options.qualityLevel,
        options.creativityLevel,
        options.seed
      );
      guidance = params.guidance;
      numSteps = params.num_inference_steps;
      seed = params.seed;
    }

    console.log("[Flux Pro] Generating...", { guidance, steps: numSteps, seed: seed ?? "none", ratio: options?.aspectRatio || "1:1" });

    const safetyTolerance = options?.safety_tolerance ?? 2;
    const promptUpsampling = options?.prompt_upsampling ?? true;

    const input: Record<string, unknown> = {
      prompt,
      aspect_ratio: options?.aspectRatio || "1:1",
      output_format: options?.outputFormat || "png",
      output_quality: options?.outputQuality || 90,
      guidance,
      num_inference_steps: numSteps,
      safety_tolerance: safetyTolerance,
      prompt_upsampling: promptUpsampling,
    };

    if (options?.interval !== undefined) {
      input.interval = options.interval;
    }

    if (seed !== undefined) {
      input.seed = seed;
    }

    const output = await replicate.run("black-forest-labs/flux-1.1-pro", {
      input,
    });

    // Flux Pro returns a single URL string or a FileOutput object with url()
    let imageUrl: string | undefined;
    if (typeof output === "string") {
      imageUrl = output;
    } else if (output && typeof output === "object" && "url" in output) {
      imageUrl = String((output as { url: () => string }).url());
    }

    if (!imageUrl) {
      return { success: false, error: "No output received from Flux Pro" };
    }

    console.log("[Flux Pro] OK, URL:", imageUrl.substring(0, 60) + "...");

    return {
      success: true,
      imageUrl,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Flux Pro] Error:", message);
    return {
      success: false,
      error: message,
    };
  }
}
