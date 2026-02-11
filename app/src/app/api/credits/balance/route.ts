import { NextResponse } from "next/server";
import { getUserCredits } from "@/lib/db/users";

export async function GET() {
  try {
    // TODO: Replace with real auth in Phase 8
    const userId = "test-user-id";

    const balance = await getUserCredits(userId);

    return NextResponse.json({
      success: true,
      balance,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
