import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

// ---------------------------------------------------------------------------
// Types & data
// ---------------------------------------------------------------------------

interface CreditPackage {
  name: string;
  credits: number;
  price: number;
  perCredit: string;
  savings: string | null;
  featured: boolean;
}

interface Transaction {
  date: string;
  description: string;
  credits: number;
  balance: number;
}

const packages: CreditPackage[] = [
  {
    name: "Starter",
    credits: 100,
    price: 10,
    perCredit: "$0.10",
    savings: null,
    featured: false,
  },
  {
    name: "Popular",
    credits: 500,
    price: 40,
    perCredit: "$0.08",
    savings: "Save 20%",
    featured: true,
  },
  {
    name: "Pro",
    credits: 2_000,
    price: 120,
    perCredit: "$0.06",
    savings: "Save 40%",
    featured: false,
  },
  {
    name: "Business",
    credits: 10_000,
    price: 450,
    perCredit: "$0.045",
    savings: "Save 55%",
    featured: false,
  },
];

const transactions: Transaction[] = [
  {
    date: "Feb 6, 2026",
    description: "Purchased Popular package",
    credits: 500,
    balance: 1_247,
  },
  {
    date: "Feb 5, 2026",
    description: "Bulk job — Q1 Product Catalog",
    credits: -500,
    balance: 747,
  },
  {
    date: "Feb 3, 2026",
    description: "DALL-E 3 generation",
    credits: -15,
    balance: 1_247,
  },
  {
    date: "Feb 1, 2026",
    description: "Background removal x10",
    credits: -10,
    balance: 1_262,
  },
  {
    date: "Jan 28, 2026",
    description: "Purchased Starter package",
    credits: 100,
    balance: 1_272,
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
  return (
    <div className="space-y-10">
      {/* ---- Page title -------------------------------------------------- */}
      <h1 className="text-2xl font-bold">Credits &amp; Billing</h1>

      {/* ---- Balance card ------------------------------------------------ */}
      <div className="flex justify-center">
        <div className="w-full max-w-lg rounded-xl bg-gradient-to-br from-primary to-blue-700 p-10 text-center text-white shadow-lg">
          <p className="text-6xl font-bold">1,247</p>
          <p className="mt-2 text-lg opacity-90">credits remaining</p>
          <p className="mt-1 text-sm opacity-75">
            ~120-400 images (depending on AI service)
          </p>
          <span className="mt-4 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs">
            &#8734; Credits never expire
          </span>
        </div>
      </div>

      {/* ---- Buy Credits ------------------------------------------------- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Buy Credits</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col rounded-lg border-2 bg-card p-6 text-center ${
                pkg.featured
                  ? "border-primary shadow-md"
                  : "border-border"
              }`}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}

              <p className="text-lg font-semibold">{pkg.name}</p>
              <p className="mt-2 text-3xl font-bold">
                {pkg.credits.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">credits</p>
              <p className="mt-4 text-2xl font-bold">${pkg.price}</p>
              <p className="text-sm text-muted-foreground">
                {pkg.perCredit}/credit
              </p>

              {pkg.savings ? (
                <p className="mt-2 text-sm font-medium text-success">
                  {pkg.savings}
                </p>
              ) : (
                <p className="mt-2 text-sm">&nbsp;</p>
              )}

              <div className="mt-auto pt-4">
                <Button
                  variant={pkg.featured ? "default" : "secondary"}
                  className="w-full"
                >
                  Buy
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

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

        <Card className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Credits</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx, i) => (
                <TableRow key={i}>
                  <TableCell className="text-muted-foreground">
                    {tx.date}
                  </TableCell>
                  <TableCell>{tx.description}</TableCell>
                  <TableCell
                    className={`text-right ${
                      tx.credits > 0
                        ? "font-semibold text-success"
                        : "font-medium text-foreground"
                    }`}
                  >
                    {tx.credits > 0
                      ? `+${tx.credits.toLocaleString()}`
                      : tx.credits.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {tx.balance.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="border-t py-4 text-center">
            <Link
              href="/credits/transactions"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all transactions &rarr;
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
