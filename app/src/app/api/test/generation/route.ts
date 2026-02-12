import { NextResponse } from "next/server";
import { generateWithDallE3 } from "@/lib/ai/openai";
import { generateWithFluxPro } from "@/lib/ai/replicate";
import { generateWithNanoBananaPro } from "@/lib/ai/google";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, style, backgroundType, ratio } = body;

    console.log("=== GENERATION REQUEST ===");
    console.log("Received ratio:", ratio);
    console.log("==========================");

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Convert ratio to DALL-E size format
    // DALL-E 3 only supports 3 sizes: 1024x1024, 1024x1792, 1792x1024
    let dalleSize: "1024x1024" | "1024x1792" | "1792x1024" = "1024x1024";
    if (ratio === "9:16" || ratio === "portrait") {
      dalleSize = "1024x1792";
    } else if (ratio === "16:9" || ratio === "landscape") {
      dalleSize = "1792x1024";
    } else if (ratio === "4:3") {
      dalleSize = "1792x1024"; // Closest DALL-E match for 4:3
    }
    console.log("DALL-E: Input ratio:", ratio, "-> Output size:", dalleSize);

    // Convert ratio to Flux aspect ratio format
    // Flux supports: 1:1, 16:9, 9:16, 4:3, 3:2
    let fluxAspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:2" = "1:1";
    if (ratio === "16:9" || ratio === "landscape") {
      fluxAspectRatio = "16:9";
    } else if (ratio === "9:16" || ratio === "portrait") {
      fluxAspectRatio = "9:16";
    } else if (ratio === "4:3") {
      fluxAspectRatio = "4:3";
    } else if (ratio === "3:2") {
      fluxAspectRatio = "3:2";
    }
    console.log("Flux Pro: Input ratio:", ratio, "-> Output aspect:", fluxAspectRatio);

    // Google Gemini has no native aspect ratio parameter
    // We pass the ratio hint via prompt text
    console.log("Google: Input ratio:", ratio, "-> Using prompt hint (no native aspect ratio support)");

    // Convert user style to DALL-E style parameter
    // DALL-E 3: "natural" = realistic/photographic, "vivid" = dramatic/artistic
    let dalleStyle: "natural" | "vivid" = "vivid";
    if (style === "realistic" || style === "commercial" || style === "minimalist") {
      dalleStyle = "natural";
    }
    console.log("DALL-E: Input style:", style, "-> Output style:", dalleStyle);

    // Build enhanced prompt using natural language (not technical parameters)
    // AI image models interpret literal "Style: realistic" as text to render
    const styleDescriptions: Record<string, string> = {
      realistic: "photorealistic, high detail photograph",
      artistic: "artistic, creative illustration",
      minimalist: "clean, minimalist composition",
      commercial: "professional product photography, commercial quality",
    };
    const backgroundDescriptions: Record<string, string> = {
      white: "on a clean white background",
      gradient: "with a smooth gradient background",
      transparent: "on a plain neutral background",
      custom: "",
    };

    let enhancedPrompt = prompt;
    if (style && style !== "default" && styleDescriptions[style]) {
      enhancedPrompt = `${styleDescriptions[style]} of: ${prompt}`;
    }
    if (backgroundType && backgroundType !== "default" && backgroundDescriptions[backgroundType]) {
      enhancedPrompt += `, ${backgroundDescriptions[backgroundType]}`;
    }

    console.log("Enhanced prompt:", enhancedPrompt);

    // For Google, also add aspect ratio hint to prompt
    let googlePrompt = enhancedPrompt;
    if (ratio && ratio !== "1:1" && ratio !== "original") {
      const ratioLabels: Record<string, string> = {
        "9:16": "in portrait orientation, taller than wide",
        "16:9": "in landscape orientation, wider than tall",
        "4:3": "in 4:3 landscape format",
        "3:2": "in 3:2 landscape format",
      };
      if (ratioLabels[ratio]) {
        googlePrompt += `, ${ratioLabels[ratio]}`;
      }
    }

    // ========================================
    // ALL 3 REAL API CALLS - in parallel
    // ========================================
    const startTime = Date.now();

    const [dalleResult, fluxResult, nanoBananaResult] = await Promise.all([
      generateWithDallE3(enhancedPrompt, {
        size: dalleSize,
        quality: "standard",
        style: dalleStyle,
      }),
      generateWithFluxPro(enhancedPrompt, {
        aspectRatio: fluxAspectRatio,
        outputFormat: "png",
        outputQuality: 90,
      }),
      generateWithNanoBananaPro(googlePrompt),
    ]);

    const totalTime = Math.round((Date.now() - startTime) / 1000);

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
        speed: `~${totalTime}s`,
        generationTime: totalTime,
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
        speed: `~${totalTime}s`,
        generationTime: totalTime,
        recommended: true,
        error: fluxResult.success ? undefined : fluxResult.error,
      },

      // REAL NANO BANANA PRO RESULT
      {
        aiService: "google_nano_banana",
        displayName: "Nano Banana Pro",
        provider: "Google",
        imageUrl: nanoBananaResult.success
          ? nanoBananaResult.imageUrl
          : "https://via.placeholder.com/512/EF4444/FFFFFF?text=Nano+Banana+Error",
        creditCost: 6,
        quality: "Excellent",
        speed: `~${totalTime}s`,
        generationTime: totalTime,
        error: nanoBananaResult.success
          ? undefined
          : nanoBananaResult.error,
      },
    ];

    return NextResponse.json({
      success: true,
      results,
      message: "All 3 AI services are live",
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
