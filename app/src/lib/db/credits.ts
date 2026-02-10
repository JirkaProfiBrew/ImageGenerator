import { supabaseAdmin } from "../supabase/server";
import type { Database } from "../supabase/database.types";
import { getUserById, updateUserCredits } from "./users";

type TransactionRow =
  Database["public"]["Tables"]["credit_transactions"]["Row"];
type TransactionInsert =
  Database["public"]["Tables"]["credit_transactions"]["Insert"];
type PackageRow = Database["public"]["Tables"]["credit_packages"]["Row"];

export async function getActivePackages(): Promise<PackageRow[]> {
  const { data } = await supabaseAdmin
    .from("credit_packages")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .returns<PackageRow[]>();

  return data ?? [];
}

export async function getUserTransactions(
  userId: string,
  limit = 50
): Promise<TransactionRow[]> {
  const { data } = await supabaseAdmin
    .from("credit_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<TransactionRow[]>();

  return data ?? [];
}

export async function createTransaction(
  data: TransactionInsert
): Promise<TransactionRow> {
  const { data: transaction, error } = await supabaseAdmin
    .from("credit_transactions")
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create transaction: ${error.message}`);
  }

  return transaction as TransactionRow;
}

export async function purchaseCredits(
  userId: string,
  packageId: string,
  stripePaymentIntentId: string
): Promise<TransactionRow> {
  // Fetch the package
  const { data: pkg, error: pkgError } = await supabaseAdmin
    .from("credit_packages")
    .select("*")
    .eq("id", packageId)
    .single();

  if (pkgError || !pkg) {
    throw new Error(`Package not found: ${packageId}`);
  }

  // Fetch the user's current balance
  const user = await getUserById(userId);

  if (!user) {
    throw new Error(`User not found: ${userId}`);
  }

  const balanceAfter = user.credit_balance + (pkg as PackageRow).credits;

  // Create the purchase transaction
  const transaction = await createTransaction({
    user_id: userId,
    type: "purchase",
    amount: (pkg as PackageRow).credits,
    description: `Purchased ${(pkg as PackageRow).name} (${(pkg as PackageRow).credits} credits)`,
    balance_after: balanceAfter,
    stripe_payment_intent_id: stripePaymentIntentId,
  });

  // Update the user's credit balance
  await updateUserCredits(userId, balanceAfter);

  return transaction;
}
