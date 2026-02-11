import { NextResponse } from "next/server";
import { getActivePackages } from "@/lib/db/credits";
import { getAIService, getGenerationServices, getEnhancementServices } from "@/lib/constants/ai-services";

export async function GET() {
  const tests: Array<{
    name: string;
    status: "PASS" | "FAIL";
    detail?: unknown;
    error?: string;
  }> = [];

  // Test 1: Credit packages from DB
  try {
    const packages = await getActivePackages();
    tests.push({
      name: "credit_packages",
      status: packages.length > 0 ? "PASS" : "FAIL",
      detail: { count: packages.length },
    });
  } catch (error) {
    tests.push({
      name: "credit_packages",
      status: "FAIL",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }

  // Test 2: AI service constants
  try {
    const genServices = getGenerationServices();
    const enhServices = getEnhancementServices();
    const fluxLookup = getAIService("replicate_flux");
    tests.push({
      name: "ai_service_constants",
      status: genServices.length > 0 && enhServices.length > 0 && fluxLookup ? "PASS" : "FAIL",
      detail: {
        generationServices: genServices.length,
        enhancementServices: enhServices.length,
        fluxLookup: fluxLookup?.displayName,
      },
    });
  } catch (error) {
    tests.push({
      name: "ai_service_constants",
      status: "FAIL",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }

  const allPassed = tests.every((t) => t.status === "PASS");

  return NextResponse.json({
    success: allPassed,
    message: "API Health Check",
    tests,
    timestamp: new Date().toISOString(),
  });
}
