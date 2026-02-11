import { NextResponse } from "next/server";
import { getUserTransactions } from "@/lib/db/credits";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    // TODO: Replace with real auth in Phase 8
    const userId = "test-user-id";
    const transactions = await getUserTransactions(userId, limit, offset);

    return NextResponse.json({
      success: true,
      transactions,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
