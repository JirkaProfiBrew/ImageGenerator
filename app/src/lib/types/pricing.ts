export interface ServiceCost {
  id: string;
  service_id: string;
  ai_service_id: string | null;
  cost_usd: number;
  valid_from: string;
  valid_to: string | null;
  source: "api_auto" | "manual" | "calculated";
  notes: string | null;
  created_at: string;
}

export interface PricingCoefficient {
  id: string;
  coefficient: number;
  valid_from: string;
  valid_to: string | null;
  name: string;
  description: string | null;
  created_at: string;
}

export interface CurrentServicePricing {
  service_id: string;
  ai_service_id: string | null;
  cost_usd: number;
  coefficient: number;
  user_price_usd: number;
  credits_required: number;
  cost_valid_from: string;
  coefficient_valid_from: string;
  source: "api_auto" | "manual" | "calculated";
  notes: string | null;
}

export type ServiceIdType =
  | "dalle3_standard_square"
  | "dalle3_standard_wide"
  | "dalle3_hd_square"
  | "dalle3_hd_wide"
  | "flux_standard"
  | "flux_high"
  | "flux_ultra"
  | "nano_1k"
  | "nano_2k"
  | "nano_4k"
  | "gpt4o_mini_context";
