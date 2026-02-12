import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface DallEGenerateOptions {
  size?: "1024x1024" | "1024x1792" | "1792x1024";
  quality?: "standard" | "hd";
  style?: "natural" | "vivid";
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
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: options?.size || "1024x1024",
      quality: options?.quality || "standard",
      style: options?.style || "vivid",
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
