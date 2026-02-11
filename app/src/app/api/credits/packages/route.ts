import { NextResponse } from "next/server";
import { getActivePackages } from "@/lib/db/credits";

export async function GET() {
  try {
    const packages = await getActivePackages();

    return NextResponse.json({
      success: true,
      packages,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
