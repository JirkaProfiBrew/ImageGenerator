export const AI_SERVICES = {
  // Generation services
  OPENAI_DALLE3: {
    id: "openai_dalle3",
    displayName: "DALL-E 3",
    provider: "OpenAI",
    mode: "generation" as const,
    creditCost: 15,
    quality: "Excellent" as const,
    avgSpeed: "~25s",
    description: "Premium quality, best for detailed scenes",
    color: "#412991", // OpenAI purple
  },
  REPLICATE_FLUX: {
    id: "replicate_flux",
    displayName: "Flux Pro",
    provider: "Replicate",
    mode: "both" as const, // works for generation AND enhancement
    creditCost: {
      generation: 8,
      enhancement: 5,
    },
    quality: "Very Good" as const,
    avgSpeed: "~12s",
    description: "Best value, fast and consistent",
    recommended: true,
    color: "#059669", // Green
  },
  GOOGLE_NANO_BANANA: {
    id: "google_nano_banana",
    displayName: "Nano Banana Pro",
    provider: "Google",
    mode: "both" as const,
    creditCost: {
      generation: 10,
      enhancement: 6,
    },
    quality: "Excellent" as const,
    avgSpeed: "~15s",
    description: "State-of-the-art Google image generation",
    color: "#EA4335", // Google red
  },

  // Enhancement only (legacy support)
  REPLICATE_SDXL: {
    id: "replicate_sdxl",
    displayName: "Stable Diffusion XL",
    provider: "Replicate",
    mode: "enhancement" as const,
    creditCost: 3,
    quality: "Good" as const,
    avgSpeed: "~8s",
    description: "Budget-friendly enhancement",
    color: "#7C3AED", // Purple
  },
} as const;

// Type definitions
export type AIServiceId = keyof typeof AI_SERVICES;
export type AIServiceMode = "generation" | "enhancement" | "both";

// Helper functions
export function getAIService(id: string) {
  return Object.values(AI_SERVICES).find((service) => service.id === id);
}

export function getGenerationServices() {
  return Object.values(AI_SERVICES).filter(
    (s) => s.mode === "generation" || s.mode === "both"
  );
}

export function getEnhancementServices() {
  return Object.values(AI_SERVICES).filter(
    (s) => s.mode === "enhancement" || s.mode === "both"
  );
}

export function getCreditCost(
  serviceId: string,
  mode: "generation" | "enhancement"
): number {
  const service = getAIService(serviceId);
  if (!service) return 0;

  if (typeof service.creditCost === "number") {
    return service.creditCost;
  }

  return service.creditCost[mode] || 0;
}

export function getServiceDisplayName(serviceId: string): string {
  const service = getAIService(serviceId);
  return service?.displayName || serviceId;
}
