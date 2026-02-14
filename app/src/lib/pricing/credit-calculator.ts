import { supabaseAdmin } from "@/lib/supabase/server";
import type { ServiceIdType } from "@/lib/types/pricing";

/**
 * Calculate credits from cost using per-service coefficient.
 * Formula: credits = CEIL(cost_usd * coefficient * 100)
 */
export function calculateCredits(
  costUSD: number,
  coefficient: number
): number {
  const credits = Math.ceil(costUSD * coefficient * 100);
  return Math.max(credits, 1); // Minimum 1 credit
}

/**
 * Get the coefficient for a service from DB.
 */
export async function getServiceCoefficient(
  serviceId: ServiceIdType
): Promise<number> {
  const { data, error } = (await supabaseAdmin
    .from("current_service_pricing")
    .select("coefficient")
    .eq("service_id", serviceId)
    .single()) as {
    data: { coefficient: number } | null;
    error: { message: string } | null;
  };

  if (error || !data) {
    console.error("[CreditCalc] No coefficient for service:", serviceId, error?.message);
    return 4.0; // fallback default
  }

  return data.coefficient;
}

/**
 * Calculate actual credits from real API cost using the service's coefficient.
 */
export async function calculateActualCredits(
  serviceId: ServiceIdType,
  actualCostUSD: number
): Promise<number> {
  const coefficient = await getServiceCoefficient(serviceId);
  return calculateCredits(actualCostUSD, coefficient);
}

/**
 * Calculate cost variance percentage.
 * Positive = actual was more expensive, negative = actual was cheaper.
 */
export function calculateVariance(
  estimated: number,
  actual: number
): number {
  if (estimated === 0) return 0;
  return Math.round(((actual - estimated) / estimated) * 100 * 100) / 100;
}
