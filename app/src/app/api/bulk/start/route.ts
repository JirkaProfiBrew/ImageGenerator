import { NextResponse } from "next/server";
import { createProject } from "@/lib/db/projects";
import { createJob } from "@/lib/db/jobs";
import { deductCredits } from "@/lib/db/credits";
import { getUserCredits } from "@/lib/db/users";
import { getCreditCost } from "@/lib/constants/ai-services";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mode, aiService, items, settings } = body;

    if (!mode || !aiService || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid request data" },
        { status: 400 }
      );
    }

    // TODO: Replace with real auth in Phase 8
    const userId = "test-user-id";

    // Calculate cost using constants
    const creditCostPerImage = getCreditCost(aiService, mode);
    const totalCredits = items.length * creditCostPerImage;

    // Check balance
    const currentBalance = await getUserCredits(userId);
    if (currentBalance < totalCredits) {
      return NextResponse.json(
        {
          success: false,
          error: "Insufficient credits",
          required: totalCredits,
          available: currentBalance,
        },
        { status: 400 }
      );
    }

    // Create project
    const project = await createProject({
      user_id: userId,
      name: `${mode} - ${new Date().toLocaleString()}`,
      mode,
      ai_service_id: aiService,
      total_images: items.length,
      settings: settings ?? {},
    });

    // Reserve credits
    await deductCredits(
      userId,
      totalCredits,
      project.id,
      `Bulk ${mode} - ${items.length} images with ${aiService}`
    );

    // Create job
    const job = await createJob({
      project_id: project.id,
      mode,
      payload: { items, settings, aiService },
      credits_reserved: totalCredits,
    });

    return NextResponse.json({
      success: true,
      jobId: job.id,
      projectId: project.id,
      creditsReserved: totalCredits,
      estimatedTime: `${Math.ceil(items.length * 0.5)} minutes`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
