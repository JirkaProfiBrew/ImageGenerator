import { NextResponse } from "next/server";
import { getProjectById } from "@/lib/db/projects";
import { getProjectImages } from "@/lib/db/images";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const project = await getProjectById(projectId);

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const images = await getProjectImages(projectId);

    return NextResponse.json({
      success: true,
      project,
      images,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
