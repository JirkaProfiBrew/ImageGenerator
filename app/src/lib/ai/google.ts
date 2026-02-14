import {
  getNanaBananaParameters,
  type QualityLevel,
  type CreativityLevel,
  type NanoBananaImageSize,
  type NanoBananaThinkingLevel,
} from "./parameter-mapper";

const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY || "";
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent";

export interface GoogleGenerateOptions {
  aspectRatio?: string;
  imageSize?: NanoBananaImageSize;
  thinkingLevel?: NanoBananaThinkingLevel;
  enableSearch?: boolean;
  uiStyle?: string;
  qualityLevel?: QualityLevel;
  creativityLevel?: CreativityLevel;
  // Context & reference images
  referenceImageParts?: { inline_data: { mime_type: string; data: string } }[];
  contextText?: string;
}

export interface GoogleResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

interface GooglePart {
  text?: string;
  // Google API returns camelCase (inlineData), NOT snake_case (inline_data)
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

interface GoogleCandidate {
  content?: {
    parts?: GooglePart[];
  };
}

interface GoogleResponse {
  candidates?: GoogleCandidate[];
  error?: { message: string; code: number };
}

export async function generateWithNanoBananaPro(
  prompt: string,
  options?: GoogleGenerateOptions
): Promise<GoogleResult> {
  try {
    let imageSize: NanoBananaImageSize = options?.imageSize ?? "1K";
    let thinkingLevel: NanoBananaThinkingLevel = options?.thinkingLevel ?? "high";

    // Auto-map from UI params if provided (and no direct params given)
    if (options?.uiStyle && options?.qualityLevel && options?.creativityLevel) {
      if (!options.imageSize && !options.thinkingLevel) {
        const params = getNanaBananaParameters(
          options.uiStyle,
          options.qualityLevel,
          options.creativityLevel
        );
        imageSize = params.imageSize;
        thinkingLevel = params.thinkingLevel;
      }
    }

    const refImageCount = options?.referenceImageParts?.length ?? 0;
    console.log("[Nano Banana] Generating...", {
      imageSize,
      thinkingLevel,
      aspectRatio: options?.aspectRatio || "not set",
      refImages: refImageCount,
      hasContext: !!options?.contextText,
      search: options?.enableSearch ?? false,
    });

    // Build content parts: text prompt + optional reference images
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contentParts: any[] = [];

    // Build prompt text with optional context
    let finalPrompt = `Generate an image: ${prompt}`;
    if (options?.contextText) {
      finalPrompt += `\n\nCONTEXT:\n${options.contextText}`;
    }
    contentParts.push({ text: finalPrompt });

    // Add reference images as inline_data (Gemini supports multi-modal input)
    if (options?.referenceImageParts && options.referenceImageParts.length > 0) {
      for (const part of options.referenceImageParts) {
        contentParts.push(part);
      }
      console.log(`[Nano Banana] Added ${options.referenceImageParts.length} reference images`);
    }

    // Build generation config - image generation params only
    // Note: temperature, topP, topK are NOT used for image generation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const generationConfig: any = {
      candidateCount: 1,
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: { imageSize },
      thinkingConfig: { thinkingLevel },
    };

    // Build request body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestBody: any = {
      contents: [{ parts: contentParts }],
      generationConfig,
    };

    // Google Search grounding
    if (options?.enableSearch) {
      requestBody.tools = [{ google_search: {} }];
      console.log("[Nano Banana] Google Search grounding enabled");
    }

    const response = await fetch(`${API_URL}?key=${GOOGLE_AI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg =
        (errorData as GoogleResponse).error?.message ||
        JSON.stringify(errorData);
      throw new Error(`Google API error ${response.status}: ${errorMsg}`);
    }

    const data = (await response.json()) as GoogleResponse;

    const candidates = data.candidates || [];
    if (candidates.length === 0) {
      throw new Error("No candidates returned from Google API");
    }

    const parts = candidates[0].content?.parts || [];

    // Find the image part (inline base64 data) - Google API uses camelCase
    const imagePart = parts.find((part) => part.inlineData);

    if (!imagePart?.inlineData) {
      throw new Error("No image found in response");
    }

    const { data: base64Data, mimeType } = imagePart.inlineData;
    const imageUrl = `data:${mimeType};base64,${base64Data}`;

    console.log("[Nano Banana] OK, image size:", Math.round(base64Data.length / 1024) + "KB");

    return {
      success: true,
      imageUrl,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Nano Banana] Error:", message);
    return {
      success: false,
      error: message,
    };
  }
}
