import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export interface FluxGenerateOptions {
  aspectRatio?: "1:1" | "16:9" | "9:16" | "4:3" | "3:2";
  outputFormat?: "png" | "jpg" | "webp";
  outputQuality?: number;
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
    console.log("Generating with Flux Pro:", prompt);

    const output = await replicate.run("black-forest-labs/flux-1.1-pro", {
      input: {
        prompt,
        aspect_ratio: options?.aspectRatio || "1:1",
        output_format: options?.outputFormat || "png",
        output_quality: options?.outputQuality || 90,
        safety_tolerance: 2,
        prompt_upsampling: true,
      },
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

    return {
      success: true,
      imageUrl,
    };
  } catch (error) {
    console.error("Flux Pro generation error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      error: message,
    };
  }
}
