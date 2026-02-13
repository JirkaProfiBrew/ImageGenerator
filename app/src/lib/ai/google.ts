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
  temperature?: number;
  uiStyle?: string;
  qualityLevel?: QualityLevel;
  creativityLevel?: CreativityLevel;
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
    let temperature = options?.temperature ?? 1.0;
    let imageSize: NanoBananaImageSize = "1K";
    let thinkingLevel: NanoBananaThinkingLevel = "minimal";

    if (options?.uiStyle && options?.qualityLevel && options?.creativityLevel) {
      const params = getNanaBananaParameters(
        options.uiStyle,
        options.qualityLevel,
        options.creativityLevel
      );
      temperature = params.temperature;
      imageSize = params.imageSize;
      thinkingLevel = params.thinkingLevel;
    }

    console.log("[Nano Banana] Generating...", { temperature, imageSize, thinkingLevel });

    const response = await fetch(`${API_URL}?key=${GOOGLE_AI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: `Generate an image: ${prompt}` }],
          },
        ],
        generationConfig: {
          temperature,
          candidateCount: 1,
          responseModalities: ["TEXT", "IMAGE"],
          imageConfig: {
            imageSize,
          },
          thinkingConfig: {
            thinkingLevel,
          },
        },
      }),
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
