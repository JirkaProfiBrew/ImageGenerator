"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  AIService,
  FluxCustomParams,
  NanoBananaCustomParams,
  DallECustomParams,
} from "@/lib/types";
import { AI_SERVICE_LABELS } from "@/lib/types";
import { useServiceCredits } from "@/hooks/useServiceCredits";

interface ServiceFineTuningModalProps {
  projectId: string;
  service: AIService;
  onClose: () => void;
  onSave: (service: AIService, useBasic: boolean, params: Record<string, unknown> | null) => void;
  initialUseBasic?: boolean;
  initialParams?: Record<string, unknown> | null;
  defaultRatio?: string;
}

export function ServiceFineTuningModal({
  projectId,
  service,
  onClose,
  onSave,
  initialUseBasic = true,
  initialParams = null,
  defaultRatio = "1:1",
}: ServiceFineTuningModalProps) {
  const [useBasicParams, setUseBasicParams] = useState(initialUseBasic);
  const [customParams, setCustomParams] = useState<Record<string, unknown>>(
    initialParams ?? getDefaults(service)
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dynamic credit pricing based on current params
  const creditInput = useMemo(() => {
    const params: Record<string, unknown> = {};

    if (service === "openai_dalle3") {
      params.quality = useBasicParams ? "standard" : (customParams.quality || "standard");
      params.ratio = defaultRatio;
    } else if (service === "replicate_flux") {
      params.steps = useBasicParams ? 25 : (customParams.num_inference_steps || 25);
    } else if (service === "google_nano_banana") {
      params.imageSize = "1K";
    }

    return [{ ai_service: service, params, enabled: true }];
  }, [service, useBasicParams, customParams, defaultRatio]);

  const { credits: currentCredits, loading: creditsLoading } = useServiceCredits(creditInput);
  const creditCost = currentCredits[service];

  // ESC key + scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/projects/${projectId}/service-configs`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ai_service_id: service,
            use_basic_params: useBasicParams,
            custom_params: useBasicParams ? null : customParams,
          }),
        }
      );

      const json = await response.json();

      if (!json.success) {
        throw new Error(json.error || "Failed to save");
      }

      onSave(service, useBasicParams, useBasicParams ? null : customParams);
      onClose();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save config";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const updateParam = useCallback(
    (key: string, value: unknown) => {
      setCustomParams((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const serviceName = AI_SERVICE_LABELS[service];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-lg max-h-[85vh] overflow-y-auto mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {serviceName} Settings
            </CardTitle>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground text-xl leading-none"
            >
              &times;
            </button>
          </div>
          <div className="rounded-md border bg-muted/50 px-3 py-2 text-sm flex items-center justify-between mt-2">
            <span className="text-muted-foreground">Credit cost:</span>
            <span className="font-semibold">
              {creditsLoading ? "..." : creditCost !== undefined ? `${creditCost} credits` : "?"}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Basic vs Advanced toggle */}
          <div className="space-y-3 rounded-md border p-3 bg-muted/30">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={useBasicParams}
                onChange={() => setUseBasicParams(true)}
                className="h-4 w-4"
              />
              <div>
                <span className="text-sm font-medium">
                  Use project settings
                </span>
                <p className="text-xs text-muted-foreground">
                  Quality &amp; creativity levels from project header are
                  auto-mapped
                </p>
              </div>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={!useBasicParams}
                onChange={() => setUseBasicParams(false)}
                className="h-4 w-4"
              />
              <div>
                <span className="text-sm font-medium">
                  Advanced settings
                </span>
                <p className="text-xs text-muted-foreground">
                  Manually configure all parameters for this service
                </p>
              </div>
            </label>
          </div>

          {/* Service-specific params */}
          {!useBasicParams && (
            <div className="space-y-4">
              {service === "replicate_flux" && (
                <FluxParams
                  params={customParams as FluxCustomParams}
                  onChange={updateParam}
                />
              )}
              {service === "google_nano_banana" && (
                <NanoBananaParams
                  params={customParams as NanoBananaCustomParams}
                  onChange={updateParam}
                />
              )}
              {service === "openai_dalle3" && (
                <DallEParams
                  params={customParams as DallECustomParams}
                  onChange={updateParam}
                />
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="outline" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- Default values per service ---

function getDefaults(service: AIService): Record<string, unknown> {
  switch (service) {
    case "replicate_flux":
      return {
        guidance: 3.5,
        num_inference_steps: 25,
        interval: 2.0,
        prompt_upsampling: false,
        safety_tolerance: 2,
      };
    case "google_nano_banana":
      return {
        temperature: 1.0,
        topP: 0.95,
        topK: 40,
        enable_search: false,
      };
    case "openai_dalle3":
      return {
        quality: "standard",
        style: "natural",
      };
  }
}

// --- Flux Pro Parameters ---

function FluxParams({
  params,
  onChange,
}: {
  params: FluxCustomParams;
  onChange: (key: string, value: unknown) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Guidance */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Guidance: {params.guidance ?? 3.5}
          <span className="ml-1 text-xs text-muted-foreground">(2.0-5.0)</span>
        </label>
        <input
          type="range"
          min="2.0"
          max="5.0"
          step="0.1"
          value={params.guidance ?? 3.5}
          onChange={(e) => onChange("guidance", parseFloat(e.target.value))}
          className="w-full accent-primary"
        />
        <p className="text-xs text-muted-foreground">
          Lower = more creative, Higher = more precise
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Inference Steps: {params.num_inference_steps ?? 25}
          <span className="ml-1 text-xs text-muted-foreground">(1-50)</span>
        </label>
        <input
          type="range"
          min="1"
          max="50"
          step="1"
          value={params.num_inference_steps ?? 25}
          onChange={(e) =>
            onChange("num_inference_steps", parseInt(e.target.value))
          }
          className="w-full accent-primary"
        />
        <p className="text-xs text-muted-foreground">
          Lower = faster, Higher = better quality
          {(params.num_inference_steps ?? 25) >= 50 && " (High tier pricing)"}
          {(params.num_inference_steps ?? 25) >= 40 && (params.num_inference_steps ?? 25) < 50 && " (Ultra tier pricing)"}
        </p>
      </div>

      {/* Interval */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Interval: {params.interval ?? 2.0}
          <span className="ml-1 text-xs text-muted-foreground">(1.0-4.0)</span>
        </label>
        <input
          type="range"
          min="1.0"
          max="4.0"
          step="0.1"
          value={params.interval ?? 2.0}
          onChange={(e) => onChange("interval", parseFloat(e.target.value))}
          className="w-full accent-primary"
        />
        <p className="text-xs text-muted-foreground">
          Creativity variation control
        </p>
      </div>

      {/* Prompt Upsampling */}
      <div className="flex items-start gap-2">
        <Checkbox
          checked={params.prompt_upsampling ?? false}
          onCheckedChange={(checked) =>
            onChange("prompt_upsampling", checked === true)
          }
        />
        <div>
          <p className="text-sm font-medium leading-none">
            Prompt Upsampling
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Let LLM expand your prompt for more variety
          </p>
        </div>
      </div>

      {/* Safety Tolerance */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Safety Tolerance: {params.safety_tolerance ?? 2}
          <span className="ml-1 text-xs text-muted-foreground">(1-6)</span>
        </label>
        <input
          type="range"
          min="1"
          max="6"
          step="1"
          value={params.safety_tolerance ?? 2}
          onChange={(e) =>
            onChange("safety_tolerance", parseInt(e.target.value))
          }
          className="w-full accent-primary"
        />
      </div>
    </div>
  );
}

// --- Nano Banana Pro Parameters ---

function NanoBananaParams({
  params,
  onChange,
}: {
  params: NanoBananaCustomParams;
  onChange: (key: string, value: unknown) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Temperature */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Temperature: {params.temperature ?? 1.0}
          <span className="ml-1 text-xs text-muted-foreground">(0.0-2.0)</span>
        </label>
        <input
          type="range"
          min="0.0"
          max="2.0"
          step="0.1"
          value={params.temperature ?? 1.0}
          onChange={(e) => onChange("temperature", parseFloat(e.target.value))}
          className="w-full accent-primary"
        />
        <p className="text-xs text-muted-foreground">
          Lower = consistent, Higher = creative
        </p>
      </div>

      {/* Top P */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Top P: {params.topP ?? 0.95}
          <span className="ml-1 text-xs text-muted-foreground">(0.0-1.0)</span>
        </label>
        <input
          type="range"
          min="0.0"
          max="1.0"
          step="0.05"
          value={params.topP ?? 0.95}
          onChange={(e) => onChange("topP", parseFloat(e.target.value))}
          className="w-full accent-primary"
        />
        <p className="text-xs text-muted-foreground">
          Nucleus sampling parameter
        </p>
      </div>

      {/* Top K */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Top K</label>
        <Input
          type="number"
          min={1}
          max={100}
          value={params.topK ?? 40}
          onChange={(e) => onChange("topK", parseInt(e.target.value) || 40)}
        />
        <p className="text-xs text-muted-foreground">
          Number of top tokens to consider (1-100)
        </p>
      </div>

      {/* Google Search */}
      <div className="flex items-start gap-2">
        <Checkbox
          checked={params.enable_search ?? false}
          onCheckedChange={(checked) =>
            onChange("enable_search", checked === true)
          }
        />
        <div>
          <p className="text-sm font-medium leading-none">
            Enable Google Search Grounding
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Use real-time web data for factual accuracy
          </p>
        </div>
      </div>
    </div>
  );
}

// --- DALL-E 3 Parameters ---

function DallEParams({
  params,
  onChange,
}: {
  params: DallECustomParams;
  onChange: (key: string, value: unknown) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Quality */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Quality</p>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={(params.quality ?? "standard") === "standard"}
              onChange={() => onChange("quality", "standard")}
              className="h-4 w-4"
            />
            <span className="text-sm">Standard (faster, cheaper)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={params.quality === "hd"}
              onChange={() => onChange("quality", "hd")}
              className="h-4 w-4"
            />
            <span className="text-sm">HD (better quality, higher credits)</span>
          </label>
        </div>
      </div>

      {/* Style */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Style</p>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={(params.style ?? "natural") === "natural"}
              onChange={() => onChange("style", "natural")}
              className="h-4 w-4"
            />
            <span className="text-sm">Natural (realistic, balanced)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={params.style === "vivid"}
              onChange={() => onChange("style", "vivid")}
              className="h-4 w-4"
            />
            <span className="text-sm">
              Vivid (dramatic, saturated colors)
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
