import { NextResponse } from "next/server";
import { getUserProjects } from "@/lib/db/projects";

export async function GET() {
  try {
    // TODO: Replace with real auth in Phase 8
    const userId = "test-user-id";
    const projects = await getUserProjects(userId);

    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
