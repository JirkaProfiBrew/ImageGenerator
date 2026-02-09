"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Grid3X3,
  List,
  RefreshCw,
} from "lucide-react";
import { ImageSelectionGrid } from "@/components/results/image-selection-grid";
import { BulkActions } from "@/components/results/bulk-actions";
import type { GeneratedImage } from "@/lib/types";

const productNames = [
  "Blue Mug",
  "Red T-shirt",
  "Leather Wallet",
  "Running Shoes",
  "Gold Watch",
  "Sunglasses",
  "Backpack",
  "Headphones",
  "Plant Pot",
];

const mockImages: GeneratedImage[] = productNames.map((name, index) => ({
  id: `img-${index + 1}`,
  projectId: "project-1",
  productName: name,
  generatedImageUrl: "",
  aiService: "flux_pro" as const,
  mode: "generation" as const,
  creditsSpent: 5,
  status: "completed" as const,
  createdAt: new Date(),
}));

const summaryItems = [
  { label: "Total Cost", value: "$24.00" },
  { label: "AI Used", value: "Flux" },
  { label: "Generated", value: "15 min ago" },
  { label: "Duration", value: "11 minutes" },
];

export default function ResultsPage({
  params,
}: {
  params: { projectId: string };
}) {
  void params.projectId;

  const [selectedIds, setSelectedIds] = useState<string[]>([
    "img-1",
    "img-2",
    "img-3",
  ]);

  const allSelected = selectedIds.length === mockImages.length;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(mockImages.map((img) => img.id));
    }
  };

  const handleDownload = (id: string) => {
    console.log("Download image:", id);
  };

  const handleRegenerate = (id: string) => {
    console.log("Regenerate image:", id);
  };

  const handleDownloadAll = () => {
    console.log("Download all selected");
  };

  const handleRegenerateSelected = () => {
    console.log("Regenerate selected:", selectedIds);
  };

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
            <Checkbox
              checked={allSelected}
              onCheckedChange={handleSelectAll}
            />
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
      <ImageSelectionGrid
        images={mockImages}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onDownload={handleDownload}
        onRegenerate={handleRegenerate}
      />

      {/* More indicator */}
      <p className="text-center text-sm text-muted-foreground">
        ...and 91 more
      </p>

      {/* Bulk actions */}
      <BulkActions
        selectedCount={selectedIds.length}
        totalCount={mockImages.length}
        onDownloadAll={handleDownloadAll}
        onRegenerateSelected={handleRegenerateSelected}
      />
    </div>
  );
}
