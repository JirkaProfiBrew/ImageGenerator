import { NextResponse } from "next/server";
import { generateWithDallE3 } from "@/lib/ai/openai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, style, backgroundType, ratio } = body;

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Convert ratio to DALL-E size format
    let dalleSize: "1024x1024" | "1024x1792" | "1792x1024" = "1024x1024";
    if (ratio === "9:16") {
      dalleSize = "1024x1792";
    } else if (ratio === "16:9") {
      dalleSize = "1792x1024";
    }

    // Build enhanced prompt with style and background
    let enhancedPrompt = prompt;
    if (style && style !== "default") {
      enhancedPrompt += `. Style: ${style}`;
    }
    if (backgroundType && backgroundType !== "default") {
      enhancedPrompt += `. Background: ${backgroundType}`;
    }

    // ========================================
    // REAL API CALL: DALL-E 3
    // ========================================
    console.log("Generating with DALL-E 3:", enhancedPrompt);
    const dalleStartTime = Date.now();
    const dalleResult = await generateWithDallE3(enhancedPrompt, {
      size: dalleSize,
      quality: "standard",
    });
    const dalleTime = Math.round((Date.now() - dalleStartTime) / 1000);

    // ========================================
    // MOCK DATA: Flux Pro & Nano Banana Pro
    // (Will be replaced in Step 2 and Step 3)
    // ========================================

    const results = [
      // REAL DALL-E 3 RESULT
      {
        aiService: "openai_dalle3",
        displayName: "DALL-E 3",
        provider: "OpenAI",
        imageUrl: dalleResult.success
          ? dalleResult.imageUrl
          : "https://via.placeholder.com/512/EF4444/FFFFFF?text=DALL-E+Error",
        creditCost: 15,
        quality: "Excellent",
        speed: `~${dalleTime}s`,
        generationTime: dalleTime,
        error: dalleResult.success ? undefined : dalleResult.error,
        revisedPrompt: dalleResult.revisedPrompt,
      },

      // MOCK: Flux Pro (will integrate in Step 2)
      {
        aiService: "replicate_flux",
        displayName: "Flux Pro",
        provider: "Replicate",
        imageUrl:
          "https://via.placeholder.com/512/059669/FFFFFF?text=Flux+Pro+(Mock)",
        creditCost: 10,
        quality: "Very Good",
        speed: "~12s",
        generationTime: 12,
        recommended: true,
      },

      // MOCK: Nano Banana Pro (will integrate in Step 3)
      {
        aiService: "google_nano_banana",
        displayName: "Nano Banana Pro",
        provider: "Google",
        imageUrl:
          "https://via.placeholder.com/512/EA4335/FFFFFF?text=Nano+Banana+(Mock)",
        creditCost: 6,
        quality: "Good",
        speed: "~15s",
        generationTime: 15,
      },
    ];

    return NextResponse.json({
      success: true,
      results,
      message: "DALL-E 3 is live, Flux and Nano Banana are still mock",
    });
  } catch (error) {
    console.error("Test generation error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
