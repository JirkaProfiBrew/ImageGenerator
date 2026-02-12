const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY || "";
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent";

export interface GoogleGenerateOptions {
  aspectRatio?: string;
  temperature?: number;
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
    console.log("Generating with Nano Banana Pro:", prompt);

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
          temperature: options?.temperature ?? 1.0,
          responseModalities: ["TEXT", "IMAGE"],
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

    // DEBUG: Log entire response structure
    console.log('=== GOOGLE API FULL RESPONSE ===');
    console.log(JSON.stringify(data, null, 2));
    console.log('================================');

    // Also log specific parts
    console.log('Candidates:', data.candidates?.length || 0);
    if (data.candidates && data.candidates.length > 0) {
      console.log('First candidate:', JSON.stringify(data.candidates[0], null, 2));
      console.log('Content parts:', data.candidates[0].content?.parts?.length || 0);
      if (data.candidates[0].content?.parts) {
        data.candidates[0].content.parts.forEach((part: GooglePart, i: number) => {
          console.log(`Part ${i} keys:`, Object.keys(part));
          if (part.text) console.log(`Part ${i} text:`, part.text.substring(0, 200));
          if (part.inlineData) console.log(`Part ${i} inlineData mime:`, part.inlineData.mimeType, 'data length:', part.inlineData.data?.length || 0);
        });
      }
    }
    console.log('================================');

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

    return {
      success: true,
      imageUrl,
    };
  } catch (error) {
    console.error("Nano Banana Pro generation error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      error: message,
    };
  }
}
