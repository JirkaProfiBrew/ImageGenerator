import { NextResponse } from "next/server";
import { getJobById, cancelJob } from "@/lib/db/jobs";
import { getProjectImages } from "@/lib/db/images";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    const job = await getJobById(jobId);

    if (!job) {
      return NextResponse.json(
        { success: false, error: "Job not found" },
        { status: 404 }
      );
    }

    if (job.status === "completed" || job.status === "cancelled") {
      return NextResponse.json(
        { success: false, error: "Job cannot be cancelled" },
        { status: 400 }
      );
    }

    // Calculate refund
    const images = await getProjectImages(job.project_id);
    const completedImages = images.filter(
      (img) => img.status === "completed"
    );
    const creditsUsed = completedImages.reduce(
      (sum, img) => sum + img.credits_spent,
      0
    );
    const creditsToRefund = job.credits_reserved - creditsUsed;

    // Cancel job and record refund amount
    await cancelJob(job.id, creditsToRefund);

    // TODO: Create refund transaction and update user balance

    return NextResponse.json({
      success: true,
      message: "Job cancelled",
      creditsRefunded: creditsToRefund,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
