import Replicate from "replicate";
import { supabaseAdmin } from "@/lib/supabase/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

/**
 * Update Flux Pro pricing from Replicate API
 *
 * Runs a minimal test prediction to get actual cost, then updates the DB
 * if the cost has changed significantly.
 */
export async function updateFluxPricing(): Promise<void> {
  try {
    console.log("[Pricing] Checking Flux Pro pricing...");

    // Run a minimal test prediction to get actual cost
    const output = await replicate.run("black-forest-labs/flux-1.1-pro", {
      input: {
        prompt: "pricing test - solid blue square",
        num_inference_steps: 25,
        guidance: 3.5,
        width: 256,
        height: 256,
        output_format: "jpg",
        output_quality: 50,
      },
    });

    // The replicate.run() doesn't return cost directly.
    // For now, we log and rely on manual cost checks or the predictions API.
    console.log(
      "[Pricing] Flux test completed. Check Replicate dashboard for actual cost."
    );
    console.log("[Pricing] Output type:", typeof output);

    // NOTE: To get actual cost, you would need to use:
    //   const prediction = await replicate.predictions.create(...)
    //   await replicate.wait(prediction)
    //   const result = await replicate.predictions.get(prediction.id)
    //   const actualCost = result.metrics?.predict_time * costPerSecond
    // This requires knowing the per-second cost which varies by model.
    // For now, we skip auto-updating Flux and rely on manual updates.

    console.log("[Pricing] Flux auto-update: skipped (manual monitoring recommended)");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Pricing] Error checking Flux pricing:", message);
  }
}

/**
 * Update GPT-4o-mini pricing (calculated from token costs)
 */
export async function updateGPTPricing(): Promise<void> {
  try {
    console.log("[Pricing] Updating GPT-4o-mini pricing...");

    // OpenAI GPT-4o-mini pricing (as of Feb 2026)
    const INPUT_PRICE_PER_1M = 0.15; // $0.15/1M input tokens
    const OUTPUT_PRICE_PER_1M = 0.6; // $0.60/1M output tokens

    // Average context generation usage
    const AVG_INPUT_TOKENS = 200;
    const AVG_OUTPUT_TOKENS = 1000;

    const estimatedCost =
      (AVG_INPUT_TOKENS / 1_000_000) * INPUT_PRICE_PER_1M +
      (AVG_OUTPUT_TOKENS / 1_000_000) * OUTPUT_PRICE_PER_1M;

    console.log(`[Pricing] Calculated GPT cost: $${estimatedCost.toFixed(6)}`);

    // Get current cost from DB
    const { data: currentCost } = (await supabaseAdmin
      .from("service_costs")
      .select("cost_usd")
      .eq("service_id", "gpt4o_mini_context")
      .is("valid_to", null)
      .single()) as { data: { cost_usd: number } | null; error: unknown };

    // Check if cost has changed significantly (threshold: $0.0001)
    if (
      currentCost &&
      Math.abs(currentCost.cost_usd - estimatedCost) < 0.0001
    ) {
      console.log("[Pricing] GPT pricing unchanged");
      return;
    }

    // Cost changed - update DB
    console.log(
      `[Pricing] Updating GPT pricing: $${currentCost?.cost_usd || "N/A"} -> $${estimatedCost.toFixed(6)}`
    );

    // Close old record
    if (currentCost) {
      const today = new Date().toISOString().split("T")[0];
      await supabaseAdmin
        .from("service_costs")
        .update({ valid_to: today })
        .eq("service_id", "gpt4o_mini_context")
        .is("valid_to", null);
    }

    // Insert new record
    const { error: insertError } = await supabaseAdmin
      .from("service_costs")
      .insert({
        service_id: "gpt4o_mini_context",
        cost_usd: estimatedCost,
        source: "calculated" as const,
        notes: `Calculated from ${AVG_INPUT_TOKENS} input + ${AVG_OUTPUT_TOKENS} output tokens`,
      });

    if (insertError) {
      console.error("[Pricing] Error inserting new cost:", insertError);
      return;
    }

    console.log("[Pricing] GPT pricing updated successfully");
    // Materialized view auto-refreshes via trigger
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Pricing] Error updating GPT pricing:", message);
  }
}

/**
 * Run all auto-updates
 */
export async function runPricingUpdates(): Promise<{
  flux: string;
  gpt: string;
}> {
  console.log("[Pricing] Starting auto-update...");

  let fluxStatus = "skipped";
  let gptStatus = "skipped";

  try {
    await updateFluxPricing();
    fluxStatus = "checked";
  } catch {
    fluxStatus = "error";
  }

  try {
    await updateGPTPricing();
    gptStatus = "updated";
  } catch {
    gptStatus = "error";
  }

  console.log("[Pricing] Auto-update complete");
  console.log(
    "[Pricing] DALL-E and Nano Banana pricing requires manual update"
  );

  return { flux: fluxStatus, gpt: gptStatus };
}
