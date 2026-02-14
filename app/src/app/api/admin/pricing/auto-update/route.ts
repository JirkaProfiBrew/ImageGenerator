import { NextRequest, NextResponse } from "next/server";
import { runPricingUpdates } from "@/lib/pricing/auto-update";

/**
 * POST /api/admin/pricing/auto-update
 *
 * Trigger pricing auto-update. Protected by bearer token.
 * Call daily via cron job or manually.
 */
export async function POST(request: NextRequest) {
  try {
    // Simple auth via header token
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.PRICING_UPDATE_SECRET;

    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const result = await runPricingUpdates();

    return NextResponse.json({
      success: true,
      message: "Pricing update completed",
      result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    console.error("[Admin Pricing] Auto-update error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
