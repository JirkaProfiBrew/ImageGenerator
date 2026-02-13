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
  const quality: "standard" | "hd" =
    qualityLevel === "ultra" ? "hd" : "standard";

  let style: "natural" | "vivid" = "natural";
  if (uiStyle === "artistic" || uiStyle === "3d") {
    style = "vivid";
  } else if (uiStyle === "realistic" && creativityLevel === "high") {
    style = "vivid";
  }

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
    high: 35,
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
export type NanoBananaThinkingLevel = "minimal" | "low" | "medium" | "high";

export interface NanoBananaParams {
  temperature: number;
  imageSize: NanoBananaImageSize;
  thinkingLevel: NanoBananaThinkingLevel;
}

export function getNanaBananaParameters(
  uiStyle: string,
  qualityLevel: QualityLevel,
  creativityLevel: CreativityLevel
): NanoBananaParams {
  const tempMap: Record<CreativityLevel, number> = {
    low: 0.5,
    medium: 0.9,
    high: 1.4,
  };

  let temperature = tempMap[creativityLevel];

  if (uiStyle === "realistic") {
    temperature = Math.max(temperature - 0.2, 0.3);
  } else if (uiStyle === "artistic") {
    temperature = Math.min(temperature + 0.3, 1.8);
  }

  const imageSizeMap: Record<QualityLevel, NanoBananaImageSize> = {
    standard: "1K",
    high: "2K",
    ultra: "4K",
  };

  const thinkingMap: Record<QualityLevel, NanoBananaThinkingLevel> = {
    standard: "minimal",
    high: "low",
    ultra: "medium",
  };

  return {
    temperature,
    imageSize: imageSizeMap[qualityLevel],
    thinkingLevel: thinkingMap[qualityLevel],
  };
}

// ============================================
// Consistency Seed Generator
// ============================================

export function generateConsistencySeed(): number {
  return Math.floor(Math.random() * 2147483647);
}
