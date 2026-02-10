import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getActivePackages } from "@/lib/db/credits";

export async function GET() {
  try {
    // 1. Test raw connection via credit_packages table
    const { data: pingData, error: pingError } = await supabaseAdmin
      .from("credit_packages")
      .select("id")
      .limit(1);

    if (pingError) {
      return NextResponse.json(
        { ok: false, step: "connection", error: pingError.message },
        { status: 500 }
      );
    }

    // 2. Test table access - query credit_packages
    const packages = await getActivePackages();

    // 3. Test users table exists
    const { count, error: usersError } = await supabaseAdmin
      .from("users")
      .select("*", { count: "exact", head: true });

    if (usersError) {
      return NextResponse.json(
        { ok: false, step: "users_table", error: usersError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      connected: true,
      creditPackages: packages.length,
      usersCount: count ?? 0,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
