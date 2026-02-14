import { supabaseAdmin } from "@/lib/supabase/server";
import type { CurrentServicePricing, ServiceIdType } from "@/lib/types/pricing";

/**
 * Get current pricing for a service (from materialized view - fast!)
 */
export async function getServicePricing(
  serviceId: ServiceIdType
): Promise<CurrentServicePricing | null> {
  const { data, error } = (await supabaseAdmin
    .from("current_service_pricing")
    .select("*")
    .eq("service_id", serviceId)
    .single()) as {
    data: CurrentServicePricing | null;
    error: { message: string } | null;
  };

  if (error) {
    console.error("[Pricing] Error fetching service pricing:", error.message);
    return null;
  }

  return data;
}

/**
 * Get credits required for a service
 */
export async function getCreditsRequired(
  serviceId: ServiceIdType
): Promise<number> {
  const pricing = await getServicePricing(serviceId);

  if (!pricing) {
    // Fallback: use the DB function directly
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin.rpc as any)(
      "get_credits_required",
      { p_service_id: serviceId }
    );

    if (error || data === null) {
      console.error("[Pricing] Fallback RPC failed:", error?.message);
      throw new Error(`No pricing found for service: ${serviceId}`);
    }

    return data as number;
  }

  return pricing.credits_required;
}

/**
 * Get all current pricing
 */
export async function getAllServicePricing(): Promise<CurrentServicePricing[]> {
  const { data, error } = (await supabaseAdmin
    .from("current_service_pricing")
    .select("*")
    .order("service_id")) as {
    data: CurrentServicePricing[] | null;
    error: { message: string } | null;
  };

  if (error) {
    console.error("[Pricing] Error fetching all pricing:", error.message);
    return [];
  }

  return data || [];
}

/**
 * Map generation parameters to service_id for pricing lookup
 */
export function getServiceId(
  aiService: string,
  params: {
    quality?: "standard" | "hd";
    ratio?: string;
    imageSize?: "1K" | "2K" | "4K";
    steps?: number;
  }
): ServiceIdType {
  // DALL-E 3
  if (aiService === "openai_dalle3") {
    const isHD = params.quality === "hd";
    const isWide = params.ratio === "16:9" || params.ratio === "9:16";

    if (isHD && isWide) return "dalle3_hd_wide";
    if (isHD) return "dalle3_hd_square";
    if (isWide) return "dalle3_standard_wide";
    return "dalle3_standard_square";
  }

  // Flux Pro
  if (aiService === "replicate_flux") {
    const steps = params.steps || 25;

    if (steps >= 50) return "flux_high";
    if (steps >= 40) return "flux_ultra";
    return "flux_standard";
  }

  // Nano Banana
  if (aiService === "google_nano_banana") {
    const size = params.imageSize || "1K";

    if (size === "4K") return "nano_4k";
    if (size === "2K") return "nano_2k";
    return "nano_1k";
  }

  // GPT-4o-mini
  if (aiService === "gpt4o_mini") {
    return "gpt4o_mini_context";
  }

  throw new Error(`Unknown service: ${aiService}`);
}

/**
 * Calculate total credits for a generation job
 */
export async function calculateJobCredits(
  services: Array<{
    aiService: string;
    params: {
      quality?: "standard" | "hd";
      ratio?: string;
      imageSize?: "1K" | "2K" | "4K";
      steps?: number;
    };
    count?: number;
  }>
): Promise<{
  total_credits: number;
  breakdown: Array<{
    service: string;
    service_id: ServiceIdType;
    credits_per_image: number;
    count: number;
    subtotal: number;
  }>;
}> {
  const breakdown = [];
  let totalCredits = 0;

  for (const svc of services) {
    const serviceId = getServiceId(svc.aiService, svc.params);
    const creditsPerImage = await getCreditsRequired(serviceId);
    const count = svc.count || 1;
    const subtotal = creditsPerImage * count;

    breakdown.push({
      service: svc.aiService,
      service_id: serviceId,
      credits_per_image: creditsPerImage,
      count,
      subtotal,
    });

    totalCredits += subtotal;
  }

  return { total_credits: totalCredits, breakdown };
}

/**
 * Refresh the pricing cache (materialized view)
 */
export async function refreshPricingCache(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabaseAdmin.rpc as any)("refresh_pricing_cache");

  if (error) {
    console.error("[Pricing] Error refreshing cache:", error.message);
    throw new Error("Failed to refresh pricing cache");
  }

  console.log("[Pricing] Cache refreshed");
}
