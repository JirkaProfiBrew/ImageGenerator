import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

type AIServiceRow = Database["public"]["Tables"]["ai_services"]["Row"];

// GET /api/ai-services
// Returns all active AI services ordered by sort_order
export async function GET() {
  try {
    const { data: services, error } = (await supabaseAdmin
      .from("ai_services")
      .select("*")
      .eq("is_available", true)
      .order("sort_order", { ascending: true })) as {
      data: AIServiceRow[] | null;
      error: { message: string } | null;
    };

    if (error) {
      console.error("[AI Services API] Query error:", error.message);
      throw new Error(error.message);
    }

    return NextResponse.json({
      success: true,
      services: services ?? [],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[AI Services API] GET error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
