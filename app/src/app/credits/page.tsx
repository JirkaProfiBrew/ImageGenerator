"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { CreditBalance } from "@/components/credits/credit-balance";
import { CreditPricing } from "@/components/credits/credit-pricing";
import { TransactionList } from "@/components/credits/transaction-list";
import type { CreditPackage, CreditTransaction } from "@/lib/types";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const packages: CreditPackage[] = [
  {
    id: "starter",
    name: "Starter",
    credits: 100,
    price: 10,
    perCredit: "$0.10",
    discountPercent: 0,
  },
  {
    id: "popular",
    name: "Popular",
    credits: 500,
    price: 40,
    perCredit: "$0.08",
    discountPercent: 20,
    isPopular: true,
  },
  {
    id: "pro",
    name: "Pro",
    credits: 2_000,
    price: 120,
    perCredit: "$0.06",
    discountPercent: 40,
  },
  {
    id: "business",
    name: "Business",
    credits: 10_000,
    price: 450,
    perCredit: "$0.045",
    discountPercent: 55,
  },
];

const transactions: CreditTransaction[] = [
  {
    id: "tx-1",
    userId: "user-1",
    type: "purchase",
    amount: 500,
    description: "Purchased Popular package",
    balanceAfter: 1_247,
    createdAt: new Date("2026-02-06"),
  },
  {
    id: "tx-2",
    userId: "user-1",
    type: "usage",
    amount: -500,
    description: "Bulk job — Q1 Product Catalog",
    balanceAfter: 747,
    createdAt: new Date("2026-02-05"),
  },
  {
    id: "tx-3",
    userId: "user-1",
    type: "usage",
    amount: -15,
    description: "DALL-E 3 generation",
    balanceAfter: 1_247,
    createdAt: new Date("2026-02-03"),
  },
  {
    id: "tx-4",
    userId: "user-1",
    type: "usage",
    amount: -10,
    description: "Background removal x10",
    balanceAfter: 1_262,
    createdAt: new Date("2026-02-01"),
  },
  {
    id: "tx-5",
    userId: "user-1",
    type: "purchase",
    amount: 100,
    description: "Purchased Starter package",
    balanceAfter: 1_272,
    createdAt: new Date("2026-01-28"),
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const costRows = {
  enhancement: [
    { label: "Background Removal", cost: "1 credit" },
    { label: "Basic Enhancement", cost: "1 credit" },
    { label: "Premium Enhancement", cost: "2 credits" },
  ],
  generation: [
    { label: "Stable Diffusion", cost: "3-6 credits" },
    { label: "Flux", cost: "5-10 credits" },
    { label: "DALL-E 3", cost: "8-15 credits" },
  ],
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CreditsPage() {
  function handleSelectPackage(id: string) {
    // TODO: integrate with payment flow
    console.log("Selected package:", id);
  }

  return (
    <div className="space-y-10">
      {/* ---- Page title -------------------------------------------------- */}
      <h1 className="text-2xl font-bold">Credits &amp; Billing</h1>

      {/* ---- Balance card ------------------------------------------------ */}
      <CreditBalance balance={1247} />

      {/* ---- Buy Credits ------------------------------------------------- */}
      <CreditPricing
        packages={packages}
        onSelectPackage={handleSelectPackage}
      />

      {/* ---- Free trial alert -------------------------------------------- */}
      <Alert className="border-primary/20 bg-primary/5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        <AlertDescription>
          You received 20 free credits on signup. No credit card required!
        </AlertDescription>
      </Alert>

      {/* ---- What do credits cost? --------------------------------------- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What do credits cost?</h2>

        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Enhancement Mode */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Enhancement Mode
                </h3>
                <div className="mt-3">
                  {costRows.enhancement.map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex justify-between py-2 text-sm ${
                        i < costRows.enhancement.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <span>{row.label}</span>
                      <span className="font-medium text-muted-foreground">
                        {row.cost}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generation Mode */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Generation Mode
                </h3>
                <div className="mt-3">
                  {costRows.generation.map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex justify-between py-2 text-sm ${
                        i < costRows.generation.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <span>{row.label}</span>
                      <span className="font-medium text-muted-foreground">
                        {row.cost}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ---- Recent Transactions ----------------------------------------- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <TransactionList transactions={transactions} />
      </section>
    </div>
  );
}
