import { NextResponse } from "next/server";
import { getJobById } from "@/lib/db/jobs";
import { getProjectImages } from "@/lib/db/images";

export async function GET(
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

    const images = await getProjectImages(job.project_id);

    // Calculate progress
    const payload = job.payload as { items?: unknown[] };
    const totalImages = payload.items?.length || 0;
    const completedImages = images.filter(
      (img) => img.status === "completed"
    ).length;
    const progress =
      totalImages > 0
        ? Math.floor((completedImages / totalImages) * 100)
        : 0;

    return NextResponse.json({
      success: true,
      job: {
        id: job.id,
        status: job.status,
        progress,
        totalImages,
        completedImages,
        failedImages: images.filter((img) => img.status === "failed").length,
        estimatedTimeRemaining: `${Math.ceil((totalImages - completedImages) * 0.5)} minutes`,
      },
      images: images.slice(0, 20),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
