"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const csvRows = [
  {
    product_name: "Blue Mug",
    description: "Ceramic coffee mug with glossy finish",
    background: "White studio",
  },
  {
    product_name: "Red T-shirt",
    description: "Cotton casual tee with round neck",
    background: "Gradient",
  },
  {
    product_name: "Leather Wallet",
    description: "Premium brown leather bifold wallet",
    background: "Marble surface",
  },
  {
    product_name: "Running Shoes",
    description: "Lightweight mesh running sneakers",
    background: "Outdoor path",
  },
  {
    product_name: "Gold Watch",
    description: "Luxury timepiece with metal band",
    background: "Dark velvet",
  },
];

export default function BulkSetupPage() {
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      {/* Back link */}
      <Link
        href="/test/enhancement"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; Back
      </Link>

      {/* Page title */}
      <h1 className="text-2xl font-bold">Bulk Generation Setup</h1>

      {/* Selected AI */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Selected AI Model</label>
        <Select defaultValue="flux">
          <SelectTrigger className="w-full max-w-xs">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flux">Flux</SelectItem>
            <SelectItem value="dall-e">DALL-E</SelectItem>
            <SelectItem value="midjourney">Midjourney</SelectItem>
            <SelectItem value="stable-diffusion">Stable Diffusion</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          (Based on your test results &mdash; best price/quality)
        </p>
      </div>

      {/* Upload CSV section */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Upload CSV</label>
        <div className="flex items-center gap-4">
          <div className="rounded bg-primary/10 p-2 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">products.csv</span>
            <span className="text-xs text-muted-foreground">100 rows</span>
          </div>
          <Button variant="secondary" size="sm" className="ml-auto">
            Change file
          </Button>
        </div>
        <Link
          href="#"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <Download className="h-4 w-4" />
          Download CSV template
        </Link>
      </div>

      {/* CSV Preview */}
      <div className="space-y-2">
        <label className="text-sm font-medium">CSV Preview</label>
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>product_name</TableHead>
                  <TableHead>description</TableHead>
                  <TableHead>background</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {csvRows.map((row) => (
                  <TableRow key={row.product_name}>
                    <TableCell className="font-medium">
                      {row.product_name}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.background}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="py-3 text-center text-sm text-muted-foreground">
            ...and 95 more rows
          </p>
        </Card>
      </div>

      {/* Cost Estimate */}
      <Card className="border-2 border-primary p-6 shadow-md">
        <h2 className="text-lg font-bold">Cost Estimate</h2>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Breakdown</span>
            <span>100 images x 5 credits = 500 credits</span>
          </div>

          <div className="border-t-2 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Dollar amount
              </span>
              <span className="text-2xl font-bold text-primary">$24.00</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Estimated time</span>
            <span>8-12 minutes</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current balance</span>
            <span className="font-semibold text-success">1,247 credits</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">After job</span>
            <span>747 credits remaining</span>
          </div>
        </div>
      </Card>

      {/* Confirmation */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Checkbox
            id="confirm"
            checked={confirmed}
            onCheckedChange={(checked) => setConfirmed(checked === true)}
          />
          <label htmlFor="confirm" className="cursor-pointer text-sm">
            I confirm and want to start generation
          </label>
        </div>

        <Button
          size="lg"
          disabled={!confirmed}
          onClick={() => router.push("/progress/demo-job")}
        >
          Start Generating
        </Button>

        <p className="text-xs text-muted-foreground">
          Credits will be deducted immediately. Unused credits from failed
          generations will be refunded automatically.
        </p>
      </div>
    </div>
  );
}
