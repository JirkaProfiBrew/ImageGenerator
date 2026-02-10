import { supabaseAdmin } from "../supabase/server";
import type { Database } from "../supabase/database.types";

type UserRow = Database["public"]["Tables"]["users"]["Row"];

export async function getUserById(id: string): Promise<UserRow | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data as UserRow;
}

export async function getUserByEmail(
  email: string
): Promise<UserRow | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    return null;
  }

  return data as UserRow;
}

export async function createUser(data: {
  email: string;
  password_hash?: string;
}): Promise<UserRow> {
  const { data: user, error } = await supabaseAdmin
    .from("users")
    .insert({
      email: data.email,
      password_hash: data.password_hash ?? null,
      credit_balance: 0,
      plan: "free" as const,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }

  return user as UserRow;
}

export async function updateUserCredits(
  userId: string,
  newBalance: number
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("users")
    .update({ credit_balance: newBalance })
    .eq("id", userId);

  if (error) {
    throw new Error(
      `Failed to update credits for user ${userId}: ${error.message}`
    );
  }
}

export async function updateUserPlan(
  userId: string,
  plan: UserRow["plan"]
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("users")
    .update({ plan })
    .eq("id", userId);

  if (error) {
    throw new Error(
      `Failed to update plan for user ${userId}: ${error.message}`
    );
  }
}
