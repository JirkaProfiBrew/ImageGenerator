import { NextResponse } from "next/server";
import { getAllServicePricing } from "@/lib/pricing/operations";

/**
 * GET /api/admin/pricing
 *
 * Get all current service pricing from materialized view.
 */
export async function GET() {
  try {
    const pricing = await getAllServicePricing();

    return NextResponse.json({
      success: true,
      pricing,
      count: pricing.length,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    console.error("[Admin Pricing] GET error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
