"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { UploadZone } from "@/components/test-mode/upload-zone";
import { ParameterPanel } from "@/components/test-mode/parameter-panel";
import type { ParameterPanelProps } from "@/components/test-mode/parameter-panel";
import { AIComparisonGrid } from "@/components/test-mode/ai-comparison-grid";
import type { AIService, AITestResult } from "@/lib/types";
import {
  enhancementParamsSchema,
  type EnhancementParams,
} from "@/lib/validations";

const mockResults: AITestResult[] = [
  {
    aiService: "dalle3",
    imageUrl: "",
    creditCost: 8,
    quality: "Excellent",
    speed: "~15s",
    tagline: "Best for realism",
  },
  {
    aiService: "flux_pro",
    imageUrl: "",
    creditCost: 5,
    quality: "Excellent",
    speed: "~10s",
    isBestValue: true,
    tagline: "Best value",
  },
  {
    aiService: "sd_xl",
    imageUrl: "",
    creditCost: 3,
    quality: "Good",
    speed: "~12s",
    tagline: "Most affordable",
  },
];

export default function TestEnhancementPage() {
  const [params, setParams] = useState<ParameterPanelProps["values"]>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<EnhancementParams>({
    resolver: zodResolver(enhancementParamsSchema),
  });

  const handleParamsChange = (values: ParameterPanelProps["values"]) => {
    setParams(values);
    if (values.operation) {
      setValue("operation", values.operation);
      trigger("operation");
    }
    if (values.background !== undefined) {
      setValue("background", values.background);
      trigger("background");
    }
    if (values.ratio) {
      setValue("ratio", values.ratio);
      trigger("ratio");
    }
  };

  const onSubmit = (data: EnhancementParams) => {
    console.log("Generating with params:", data, "file:", uploadedFile);
  };

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
      >
        &larr; Back to Dashboard
      </Link>

      {/* Mode toggle */}
      <ModeToggle activeMode="enhancement" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Step 1: Upload Product Image */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                1
              </span>
              Upload Product Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UploadZone onFileSelect={setUploadedFile} />
          </CardContent>
        </Card>

        {/* Step 2: Enhancement Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                2
              </span>
              Enhancement Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ParameterPanel
              mode="enhancement"
              values={params}
              onChange={handleParamsChange}
            />
            {errors.operation && (
              <p className="text-sm text-destructive">{errors.operation.message}</p>
            )}
            {errors.background && (
              <p className="text-sm text-destructive">{errors.background.message}</p>
            )}
            {errors.ratio && (
              <p className="text-sm text-destructive">{errors.ratio.message}</p>
            )}
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button type="submit" size="lg" className="px-8">
            Generate 3 Variants
          </Button>
          <p className="mt-2 text-sm text-muted-foreground">
            Cost: ~3-8 credits per variant
          </p>
        </div>
      </form>

      {/* Results section */}
      <Separator />

      <h2 className="text-2xl font-semibold">Compare AI Results</h2>

      <AIComparisonGrid
        results={mockResults}
        onSelectAI={(service: AIService) => {
          console.log("Selected AI service:", service);
        }}
      />

      {/* Bottom CTA box */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-8 text-center">
        <h3 className="mb-2 text-lg font-semibold">
          Satisfied with the results?
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Scale your workflow by processing images in bulk.
        </p>
        <Button
          asChild
          className="bg-success text-success-foreground hover:bg-success/90"
        >
          <Link href="/bulk/setup">Start Bulk Enhancement</Link>
        </Button>
      </div>
    </div>
  );
}
