"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
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
      params.imageSize = useBasicParams ? "1K" : (customParams.imageSize || "1K");
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
        imageSize: "1K",
        thinkingLevel: "high",
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
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Lower = faster, Higher = better quality</p>
          <p className="font-medium text-blue-600">
            Current tier:{" "}
            {(params.num_inference_steps ?? 25) <= 30
              ? "Standard (2 cr)"
              : (params.num_inference_steps ?? 25) <= 40
                ? "High (3 cr)"
                : "Ultra (4 cr)"}
          </p>
        </div>
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
      {/* Image Size Selection */}
      <div>
        <label className="block text-sm font-medium mb-3">
          Image Size
        </label>
        <div className="space-y-3">
          <label className="flex items-start gap-3 p-3 border rounded cursor-pointer hover:bg-muted/50 transition-colors">
            <input
              type="radio"
              name="imageSize"
              value="1K"
              checked={!params.imageSize || params.imageSize === "1K"}
              onChange={() => onChange("imageSize", "1K")}
              className="mt-1 h-4 w-4"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">1K (1024x1024)</span>
                <span className="text-sm text-muted-foreground">54 credits</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Standard resolution, smaller file size
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 border rounded cursor-pointer hover:bg-muted/50 transition-colors">
            <input
              type="radio"
              name="imageSize"
              value="2K"
              checked={params.imageSize === "2K"}
              onChange={() => onChange("imageSize", "2K")}
              className="mt-1 h-4 w-4"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">2K (2048x2048)</span>
                <span className="text-sm text-muted-foreground">54 credits</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Better quality, same cost as 1K
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 border-2 border-orange-200 rounded cursor-pointer hover:bg-orange-50 transition-colors">
            <input
              type="radio"
              name="imageSize"
              value="4K"
              checked={params.imageSize === "4K"}
              onChange={() => onChange("imageSize", "4K")}
              className="mt-1 h-4 w-4"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-orange-900">4K (4096x4096)</span>
                <span className="text-sm font-semibold text-orange-600">96 credits</span>
              </div>
              <p className="text-xs text-orange-700 mt-1">
                Highest quality, double cost
              </p>
            </div>
          </label>
        </div>

        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
          <strong>Tip:</strong> 1K and 2K cost the same ($0.134/image).
          Choose 2K for better quality unless you need smaller file sizes.
        </div>
      </div>

      {/* Thinking Level Selection */}
      <div>
        <label className="block text-sm font-medium mb-3">
          Thinking Level
        </label>
        <div className="space-y-2">
          <label className="flex items-start gap-3 p-3 border rounded cursor-pointer hover:bg-muted/50 transition-colors">
            <input
              type="radio"
              name="thinkingLevel"
              value="low"
              checked={params.thinkingLevel === "low"}
              onChange={() => onChange("thinkingLevel", "low")}
              className="mt-1 h-4 w-4"
            />
            <div className="flex-1">
              <div className="font-medium text-sm">Low</div>
              <p className="text-xs text-muted-foreground mt-1">
                Faster generation, simple prompts
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 border rounded cursor-pointer hover:bg-muted/50 transition-colors">
            <input
              type="radio"
              name="thinkingLevel"
              value="high"
              checked={!params.thinkingLevel || params.thinkingLevel === "high"}
              onChange={() => onChange("thinkingLevel", "high")}
              className="mt-1 h-4 w-4"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">High</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                  Recommended
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Better reasoning, complex prompts, creative interpretation
              </p>
            </div>
          </label>
        </div>

        <div className="mt-2 p-2 bg-muted/50 border rounded text-xs text-muted-foreground">
          Thinking level affects quality and generation time, but NOT credit cost.
        </div>
      </div>

      {/* Google Search - Coming Soon */}
      <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-blue-900 text-sm">Google Search Grounding</span>
          <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded font-medium">
            Coming Soon
          </span>
        </div>
        <p className="text-xs text-blue-700">
          Generate images with real-time data: weather forecasts, stock charts, current events, and more.
        </p>
      </div>

      {/* About Nano Banana Pro */}
      <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800 space-y-1">
        <p className="font-medium text-blue-900">About Nano Banana Pro</p>
        <ul className="space-y-0.5">
          <li>&#8226; Google&apos;s highest quality image generation model</li>
          <li>&#8226; Excellent text rendering - perfect for posters, infographics</li>
          <li>&#8226; Up to 4K resolution (4096x4096) support</li>
          <li>&#8226; Advanced reasoning for complex, creative prompts</li>
          <li>&#8226; Character consistency features (coming soon)</li>
        </ul>
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
            <span className="text-sm">Natural (photorealistic)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={params.style === "vivid"}
              onChange={() => onChange("style", "vivid")}
              className="h-4 w-4"
            />
            <span className="text-sm">
              Vivid (hyper-real, dramatic colors)
            </span>
          </label>
        </div>
        <p className="text-xs text-muted-foreground">
          If using project settings, Realistic style maps to Natural, all others to Vivid.
        </p>
      </div>

      {/* DALL-E 3 info */}
      <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800 space-y-1">
        <p className="font-medium text-blue-900">About DALL-E 3</p>
        <ul className="space-y-0.5">
          <li>&#8226; Supported ratios: 1:1, 16:9, 9:16 (5:4 converts to 16:9)</li>
          <li>&#8226; HD quality increases the credit cost</li>
          <li>&#8226; Aspect ratio is set in project settings</li>
        </ul>
      </div>
    </div>
  );
}
