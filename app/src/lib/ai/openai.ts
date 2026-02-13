import OpenAI from "openai";
import {
  getDallE3Parameters,
  type QualityLevel,
  type CreativityLevel,
} from "./parameter-mapper";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface DallEGenerateOptions {
  size?: "1024x1024" | "1024x1792" | "1792x1024";
  quality?: "standard" | "hd";
  style?: "natural" | "vivid";
  uiStyle?: string;
  qualityLevel?: QualityLevel;
  creativityLevel?: CreativityLevel;
}

export interface DallEResult {
  success: boolean;
  imageUrl?: string;
  revisedPrompt?: string;
  error?: string;
}

export async function generateWithDallE3(
  prompt: string,
  options?: DallEGenerateOptions
): Promise<DallEResult> {
  try {
    let quality: "standard" | "hd" = options?.quality || "standard";
    let style: "natural" | "vivid" = options?.style || "vivid";

    if (options?.uiStyle && options?.qualityLevel && options?.creativityLevel) {
      const params = getDallE3Parameters(
        options.uiStyle,
        options.qualityLevel,
        options.creativityLevel
      );
      quality = params.quality;
      style = params.style;
      console.log("DALL-E 3 params:", { quality, style });
    }

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: options?.size || "1024x1024",
      quality,
      style,
    });

    const image = response.data?.[0];
    if (!image?.url) {
      return { success: false, error: "No image returned from DALL-E 3" };
    }

    return {
      success: true,
      imageUrl: image.url,
      revisedPrompt: image.revised_prompt,
    };
  } catch (error) {
    console.error("DALL-E 3 generation error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      error: message,
    };
  }
}
