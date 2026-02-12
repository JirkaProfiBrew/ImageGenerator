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
import { ParameterPanel } from "@/components/test-mode/parameter-panel";
import type { ParameterPanelProps } from "@/components/test-mode/parameter-panel";
import { AIComparisonGrid } from "@/components/test-mode/ai-comparison-grid";
import type { AIService, AITestResult } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
  generationParamsSchema,
  type GenerationParams,
} from "@/lib/validations";

interface SelectedServices {
  dalle3: boolean;
  flux: boolean;
  nanoBanana: boolean;
}

export default function TestGenerationPage() {
  const [params, setParams] = useState<ParameterPanelProps["values"]>({});
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AITestResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<SelectedServices>({
    dalle3: true,
    flux: true,
    nanoBanana: true,
  });

  const selectedCount =
    Number(selectedServices.dalle3) +
    Number(selectedServices.flux) +
    Number(selectedServices.nanoBanana);

  const totalCredits =
    (selectedServices.dalle3 ? 15 : 0) +
    (selectedServices.flux ? 10 : 0) +
    (selectedServices.nanoBanana ? 6 : 0);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<GenerationParams>({
    resolver: zodResolver(generationParamsSchema),
  });

  const handleParamsChange = (values: ParameterPanelProps["values"]) => {
    setParams(values);
    if (values.prompt !== undefined) {
      setValue("prompt", values.prompt);
      trigger("prompt");
    }
    if (values.style) {
      setValue("style", values.style);
      trigger("style");
    }
    if (values.backgroundType) {
      setValue("backgroundType", values.backgroundType);
      trigger("backgroundType");
    }
    if (values.ratio) {
      setValue("ratio", values.ratio);
      trigger("ratio");
    }
  };

  const handleSelectAI = (service: AIService) => {
    console.log("Selected AI service:", service);
  };

  const onSubmit = async (data: GenerationParams) => {
    console.log("Starting generation with:", data);
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch("/api/test/generation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: data.prompt,
          style: data.style,
          backgroundType: data.backgroundType,
          ratio: data.ratio,
          selectedServices,
        }),
      });

      const json = await response.json();
      console.log("API response:", json);

      if (!json.success) {
        throw new Error(json.error || "Generation failed");
      }

      setResults(json.results);
    } catch (err) {
      console.error("Generation error:", err);
      const message =
        err instanceof Error ? err.message : "Failed to generate images";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back to Dashboard
      </Link>

      {/* Mode toggle */}
      <ModeToggle activeMode="generation" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Step 1 - Describe Your Image */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                1
              </span>
              Describe Your Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ParameterPanel
              mode="generation"
              values={params}
              onChange={handleParamsChange}
            />
            {errors.prompt && (
              <p className="text-sm text-destructive">{errors.prompt.message}</p>
            )}
            {errors.style && (
              <p className="text-sm text-destructive">{errors.style.message}</p>
            )}
            {errors.backgroundType && (
              <p className="text-sm text-destructive">{errors.backgroundType.message}</p>
            )}
            {errors.ratio && (
              <p className="text-sm text-destructive">{errors.ratio.message}</p>
            )}
          </CardContent>
        </Card>

        {/* Step 2 - Select AI Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                2
              </span>
              Select AI Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedServices.dalle3}
                  onCheckedChange={(checked) =>
                    setSelectedServices((prev) => ({
                      ...prev,
                      dalle3: checked === true,
                    }))
                  }
                />
                <span className="text-sm">DALL-E 3 (15 credits)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedServices.flux}
                  onCheckedChange={(checked) =>
                    setSelectedServices((prev) => ({
                      ...prev,
                      flux: checked === true,
                    }))
                  }
                />
                <span className="text-sm">Flux Pro (10 credits)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedServices.nanoBanana}
                  onCheckedChange={(checked) =>
                    setSelectedServices((prev) => ({
                      ...prev,
                      nanoBanana: checked === true,
                    }))
                  }
                />
                <span className="text-sm">Nano Banana Pro (6 credits)</span>
              </label>
            </div>

            {selectedCount === 0 && (
              <p className="text-sm text-destructive">
                Select at least one AI service
              </p>
            )}

            <p className="text-sm text-muted-foreground">
              Estimated cost: {totalCredits} credits ({selectedCount}{" "}
              {selectedCount === 1 ? "service" : "services"})
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex flex-col items-center gap-2">
          <Button
            type="submit"
            size="lg"
            className="px-10 text-base"
            disabled={loading || selectedCount === 0}
          >
            {loading
              ? "Generating..."
              : `Generate ${selectedCount} Variant${selectedCount !== 1 ? "s" : ""}`}
          </Button>
          {loading ? (
            <p className="text-sm text-muted-foreground">
              This may take 20-30 seconds...
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Cost: ~{totalCredits} credits
            </p>
          )}
        </div>
      </form>

      {/* Error display */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          Error: {error}
        </div>
      )}

      {/* Results section */}
      {results && results.length > 0 && (
        <>
          <Separator />
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Compare AI Results</h2>
            <AIComparisonGrid results={results} onSelectAI={handleSelectAI} />
          </div>

          {/* Bottom CTA */}
          <div className="rounded-lg border bg-card p-10 text-center space-y-4">
            <h3 className="text-xl font-semibold">
              Satisfied? Start Bulk Generation
            </h3>
            <p className="text-sm text-muted-foreground">
              Scale your chosen model across all your products with a single click.
            </p>
            <Button
              asChild
              className="bg-success text-white hover:bg-success/90"
              size="lg"
            >
              <Link href="/bulk/setup">Start Bulk Generation</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
