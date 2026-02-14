import { NextRequest, NextResponse } from "next/server";
import { getServiceId, getCreditsRequired, calculateJobCredits } from "@/lib/pricing/operations";

/**
 * POST /api/pricing/calculate-credits
 *
 * Calculate credits required for AI services.
 * Supports single service or batch calculation.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Batch mode
    if (body.services && Array.isArray(body.services)) {
      const result = await calculateJobCredits(
        body.services.map((svc: { ai_service: string; params: Record<string, unknown>; count?: number }) => ({
          aiService: svc.ai_service,
          params: svc.params || {},
          count: svc.count,
        }))
      );

      return NextResponse.json({
        success: true,
        ...result,
      });
    }

    // Single service mode
    const { ai_service, params = {} } = body;

    if (!ai_service) {
      return NextResponse.json(
        { success: false, error: "ai_service is required" },
        { status: 400 }
      );
    }

    const serviceId = getServiceId(ai_service, params);
    const credits = await getCreditsRequired(serviceId);

    return NextResponse.json({
      success: true,
      service_id: serviceId,
      credits_required: credits,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("[Pricing API] Error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
