import { NextResponse } from "next/server";

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

    // TODO Phase 7: Replace with real AI calls
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const mockResults = [
      {
        aiService: "openai_dalle3",
        displayName: "DALL-E 3",
        provider: "OpenAI",
        imageUrl:
          "https://via.placeholder.com/512/412991/FFFFFF?text=DALL-E+3+Generated",
        creditCost: 15,
        quality: "Excellent",
        speed: "~25s",
        generationTime: 25,
      },
      {
        aiService: "replicate_flux",
        displayName: "Flux Pro",
        provider: "Replicate",
        imageUrl:
          "https://via.placeholder.com/512/059669/FFFFFF?text=Flux+Generated",
        creditCost: 10,
        quality: "Very Good",
        speed: "~12s",
        generationTime: 12,
        recommended: true,
      },
      {
        aiService: "google_nano_banana",
        displayName: "Nano Banana Pro",
        provider: "Google",
        imageUrl:
          "https://via.placeholder.com/512/EA4335/FFFFFF?text=Nano+Banana+Generated",
        creditCost: 6,
        quality: "Good",
        speed: "~15s",
        generationTime: 15,
      },
    ];

    return NextResponse.json({
      success: true,
      results: mockResults,
      params: { prompt, style, backgroundType, ratio },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
