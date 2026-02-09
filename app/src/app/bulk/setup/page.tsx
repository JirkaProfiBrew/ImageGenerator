"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { AIServiceSelector } from "@/components/bulk-upload/ai-service-selector";
import { CSVUploader } from "@/components/bulk-upload/csv-uploader";
import { CSVPreviewTable } from "@/components/bulk-upload/csv-preview-table";
import { CostCalculator } from "@/components/bulk-upload/cost-calculator";

import type { AIService, CSVRow, CostEstimate } from "@/lib/types";
import { bulkUploadSchema, type BulkUploadParams } from "@/lib/validations";

const mockCSVData: CSVRow[] = [
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

const mockCostEstimate: CostEstimate = {
  totalImages: 100,
  creditsPerImage: 5,
  totalCredits: 500,
  dollarAmount: 24.0,
  estimatedTime: "8-12 minutes",
  currentBalance: 1247,
  balanceAfter: 747,
};

export default function BulkSetupPage() {
  const [fileName] = useState("products.csv");
  const [rowCount] = useState(100);
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BulkUploadParams>({
    resolver: zodResolver(bulkUploadSchema),
    defaultValues: {
      aiService: "flux_pro",
    },
  });

  const confirmed = watch("confirmed");
  const aiService = watch("aiService") ?? "flux_pro";

  const onSubmit = (data: BulkUploadParams) => {
    console.log("Starting bulk generation:", data);
    router.push("/progress/demo-job");
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* AI Model Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Selected AI Model</label>
          <AIServiceSelector
            value={aiService as AIService}
            onChange={(service) => setValue("aiService", service)}
          />
          {errors.aiService && (
            <p className="text-sm text-destructive">{errors.aiService.message}</p>
          )}
        </div>

        {/* Upload CSV section */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Upload CSV</label>
          <CSVUploader
            onFileSelect={(file) => console.log("File selected:", file.name)}
            fileName={fileName}
            rowCount={rowCount}
          />
        </div>

        {/* CSV Preview */}
        <div className="space-y-2">
          <label className="text-sm font-medium">CSV Preview</label>
          <CSVPreviewTable data={mockCSVData} totalRows={100} />
        </div>

        {/* Cost Estimate */}
        <CostCalculator estimate={mockCostEstimate} />

        {/* Confirmation */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Checkbox
              id="confirm"
              checked={confirmed === true}
              onCheckedChange={(checked) =>
                setValue("confirmed", checked === true ? true : (false as never), {
                  shouldValidate: true,
                })
              }
            />
            <label htmlFor="confirm" className="cursor-pointer text-sm">
              I confirm and want to start generation
            </label>
          </div>
          {errors.confirmed && (
            <p className="text-sm text-destructive">{errors.confirmed.message}</p>
          )}

          <Button type="submit" size="lg" disabled={!confirmed}>
            Start Generating
          </Button>

          <p className="text-xs text-muted-foreground">
            Credits will be deducted immediately. Unused credits from failed
            generations will be refunded automatically.
          </p>
        </div>
      </form>
    </div>
  );
}
