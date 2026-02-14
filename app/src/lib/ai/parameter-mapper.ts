export type QualityLevel = "standard" | "high" | "ultra";
export type CreativityLevel = "low" | "medium" | "high";

// ============================================
// DALL-E 3 Parameters
// ============================================

export interface DallE3Params {
  quality: "standard" | "hd";
  style: "natural" | "vivid";
}

export function getDallE3Parameters(
  uiStyle: string,
  qualityLevel: QualityLevel,
  creativityLevel: CreativityLevel
): DallE3Params {
  // creativityLevel kept for API compatibility (callers pass all 3 params)
  void creativityLevel;

  const quality: "standard" | "hd" =
    qualityLevel === "ultra" ? "hd" : "standard";

  // Style mapping: Realistic → natural, all others → vivid
  const style: "natural" | "vivid" =
    uiStyle === "realistic" ? "natural" : "vivid";

  return { quality, style };
}

// ============================================
// Flux Pro Parameters
// ============================================

export interface FluxProParams {
  guidance: number;
  num_inference_steps: number;
  seed?: number;
}

export function getFluxProParameters(
  uiStyle: string,
  qualityLevel: QualityLevel,
  creativityLevel: CreativityLevel,
  consistencySeed?: number | null
): FluxProParams {
  const guidanceMap: Record<CreativityLevel, number> = {
    low: 5.0,
    medium: 7.5,
    high: 9.5,
  };

  let guidance = guidanceMap[creativityLevel];

  if (uiStyle === "3d" || uiStyle === "minimalist") {
    guidance = Math.min(guidance + 1.0, 10.0);
  } else if (uiStyle === "artistic") {
    guidance = Math.max(guidance - 1.0, 3.5);
  }

  const stepsMap: Record<QualityLevel, number> = {
    standard: 25,
    high: 38,
    ultra: 50,
  };

  return {
    guidance,
    num_inference_steps: stepsMap[qualityLevel],
    seed: consistencySeed ?? undefined,
  };
}

// ============================================
// Nano Banana Pro (Google) Parameters
// ============================================

export type NanoBananaImageSize = "1K" | "2K" | "4K";
export type NanoBananaThinkingLevel = "low" | "high";

export interface NanoBananaParams {
  imageSize: NanoBananaImageSize;
  thinkingLevel: NanoBananaThinkingLevel;
}

/**
 * Map project settings to Nano Banana Pro parameters.
 * - quality_level -> imageSize (standard=1K, high=2K, ultra=4K)
 * - creativity_level -> thinkingLevel (low=low, medium/high=high)
 * Note: temperature/topP/topK are NOT used for image generation.
 */
export function getNanaBananaParameters(
  _uiStyle: string,
  qualityLevel: QualityLevel,
  creativityLevel: CreativityLevel
): NanoBananaParams {
  const imageSizeMap: Record<QualityLevel, NanoBananaImageSize> = {
    standard: "1K",
    high: "2K",
    ultra: "4K",
  };

  const thinkingLevel: NanoBananaThinkingLevel =
    creativityLevel === "low" ? "low" : "high";

  return {
    imageSize: imageSizeMap[qualityLevel],
    thinkingLevel,
  };
}

// ============================================
// Unified Final Parameters (custom config or basic mapping)
// ============================================

/**
 * Returns final parameters for a service.
 * If a custom config exists (use_basic_params=false), returns custom_params.
 * Otherwise, maps from UI quality/creativity levels.
 */
export function getFinalParameters(
  serviceConfig: { use_basic_params: boolean; custom_params?: Record<string, unknown> | null } | null,
  uiStyle: string,
  qualityLevel: QualityLevel,
  creativityLevel: CreativityLevel,
  aiService: string,
  consistencySeed?: number | null
): Record<string, unknown> {
  // Custom config overrides basic mapping
  if (serviceConfig && !serviceConfig.use_basic_params && serviceConfig.custom_params) {
    console.log(`[${aiService}] Using custom parameters:`, serviceConfig.custom_params);
    return serviceConfig.custom_params;
  }

  // Basic mapping from UI levels
  console.log(`[${aiService}] Using basic parameters (mapped from ${qualityLevel}/${creativityLevel})`);

  if (aiService === "openai_dalle3") {
    const dalleParams = getDallE3Parameters(uiStyle, qualityLevel, creativityLevel);
    console.log(`[DALL-E Params] Project style: ${uiStyle} → API style: ${dalleParams.style}`);
    console.log("[DALL-E Params] Final params:", dalleParams);
    return { ...dalleParams };
  } else if (aiService === "replicate_flux") {
    return { ...getFluxProParameters(uiStyle, qualityLevel, creativityLevel, consistencySeed) };
  } else if (aiService === "google_nano_banana") {
    return { ...getNanaBananaParameters(uiStyle, qualityLevel, creativityLevel) };
  }

  return {};
}

// ============================================
// Consistency Seed Generator
// ============================================

export function generateConsistencySeed(): number {
  return Math.floor(Math.random() * 2147483647);
}
