import { NextResponse } from "next/server";
import { generateWithDallE3 } from "@/lib/ai/openai";
import { generateWithFluxPro } from "@/lib/ai/replicate";

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

    // Convert ratio to Flux aspect ratio format
    let fluxAspectRatio: "1:1" | "16:9" | "9:16" = "1:1";
    if (ratio === "16:9") {
      fluxAspectRatio = "16:9";
    } else if (ratio === "9:16") {
      fluxAspectRatio = "9:16";
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
    // REAL API CALLS: DALL-E 3 + Flux Pro
    // Run in parallel for speed
    // ========================================
    const dalleStartTime = Date.now();
    const fluxStartTime = Date.now();

    const [dalleResult, fluxResult] = await Promise.all([
      generateWithDallE3(enhancedPrompt, {
        size: dalleSize,
        quality: "standard",
      }),
      generateWithFluxPro(enhancedPrompt, {
        aspectRatio: fluxAspectRatio,
        outputFormat: "png",
        outputQuality: 90,
      }),
    ]);

    const dalleTime = Math.round((Date.now() - dalleStartTime) / 1000);
    const fluxTime = Math.round((Date.now() - fluxStartTime) / 1000);

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

      // REAL FLUX PRO RESULT
      {
        aiService: "replicate_flux",
        displayName: "Flux Pro",
        provider: "Replicate",
        imageUrl: fluxResult.success
          ? fluxResult.imageUrl
          : "https://via.placeholder.com/512/EF4444/FFFFFF?text=Flux+Error",
        creditCost: 10,
        quality: "Very Good",
        speed: `~${fluxTime}s`,
        generationTime: fluxTime,
        recommended: true,
        error: fluxResult.success ? undefined : fluxResult.error,
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
      message: "DALL-E 3 and Flux Pro are live, Nano Banana is still mock",
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
