"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Grid3X3,
  ImageIcon,
  List,
  RefreshCw,
  Trash2,
} from "lucide-react";

interface Product {
  name: string;
  defaultChecked: boolean;
}

const products: Product[] = [
  { name: "Blue Mug", defaultChecked: true },
  { name: "Red T-shirt", defaultChecked: true },
  { name: "Leather Wallet", defaultChecked: true },
  { name: "Running Shoes", defaultChecked: false },
  { name: "Gold Watch", defaultChecked: false },
  { name: "Sunglasses", defaultChecked: false },
  { name: "Backpack", defaultChecked: false },
  { name: "Headphones", defaultChecked: false },
  { name: "Plant Pot", defaultChecked: false },
];

const summaryItems = [
  { label: "Total Cost", value: "$24.00" },
  { label: "AI Used", value: "Flux" },
  { label: "Generated", value: "15 min ago" },
  { label: "Duration", value: "11 minutes" },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ResultsPage({ params }: {
  params: { projectId: string };
}) {
  return (
    <div className="space-y-6 pb-24">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Projects
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium">Q1 Product Catalog</span>
      </nav>

      {/* Success banner */}
      <div className="flex gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
        <span className="text-sm font-medium">
          100 images generated successfully
        </span>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {summaryItems.map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <Button>
          <Download className="h-4 w-4" />
          Download All (ZIP)
        </Button>
        <Button variant="secondary">
          <RefreshCw className="h-4 w-4" />
          Regenerate Failed
        </Button>
        <Button variant="secondary">Export CSV</Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-2">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox />
            Select All
          </label>
          <select className="h-8 rounded-md border border-input bg-background px-2 text-sm">
            <option>All Images</option>
            <option>Successful</option>
            <option>Failed</option>
          </select>
          <select className="h-8 rounded-md border border-input bg-background px-2 text-sm">
            <option>Name A-Z</option>
            <option>Name Z-A</option>
            <option>Date</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="bg-primary/10 text-primary"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.name}
            className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md"
          >
            {/* Checkbox overlay */}
            <Checkbox
              defaultChecked={product.defaultChecked}
              className="absolute left-2 top-2 z-10"
            />

            {/* Image placeholder */}
            <div className="flex aspect-square items-center justify-center bg-muted text-4xl text-muted-foreground">
              <ImageIcon className="h-12 w-12" />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-2">
              <span className="text-sm font-medium">{product.name}</span>
              <div className="flex items-center gap-0.5">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Download className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* More indicator */}
      <p className="text-center text-sm text-muted-foreground">
        ...and 91 more
      </p>

      {/* Sticky bottom bar */}
      <div className="sticky bottom-0 z-50 flex justify-end gap-2 border-t bg-card p-4 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
        <Button variant="secondary">Regenerate Selected (3)</Button>
        <Button>Download Selected</Button>
      </div>
    </div>
  );
}
