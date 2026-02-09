"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  Mode,
  EnhancementOperation,
  AspectRatio,
  ImageStyle,
  BackgroundType,
} from "@/lib/types";

export interface ParameterPanelProps {
  mode: Mode;
  values: {
    operation?: EnhancementOperation;
    background?: string;
    ratio?: AspectRatio;
    style?: ImageStyle;
    backgroundType?: BackgroundType;
    prompt?: string;
  };
  onChange: (values: ParameterPanelProps["values"]) => void;
}

export function ParameterPanel({ mode, values, onChange }: ParameterPanelProps) {
  const update = (patch: Partial<ParameterPanelProps["values"]>) => {
    onChange({ ...values, ...patch });
  };

  if (mode === "enhancement") {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Operation */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Operation</label>
          <Select
            value={values.operation ?? ""}
            onValueChange={(v) =>
              update({ operation: v as EnhancementOperation })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select operation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="background-replacement">
                Background Replacement
              </SelectItem>
              <SelectItem value="enhancement-basic">
                Enhancement (Basic)
              </SelectItem>
              <SelectItem value="enhancement-premium">
                Enhancement (Premium)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Background Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Background Description</label>
          <Input
            placeholder="e.g. White studio backdrop"
            value={values.background ?? ""}
            onChange={(e) => update({ background: e.target.value })}
          />
        </div>

        {/* Output Ratio */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Output Ratio</label>
          <Select
            value={values.ratio ?? ""}
            onValueChange={(v) => update({ ratio: v as AspectRatio })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select ratio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1:1">1:1 (Square)</SelectItem>
              <SelectItem value="4:3">4:3 (Landscape)</SelectItem>
              <SelectItem value="16:9">16:9 (Wide)</SelectItem>
              <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
              <SelectItem value="original">Original</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  // mode === "generation"
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Prompt */}
      <div className="space-y-2 md:col-span-3">
        <label className="text-sm font-medium">Prompt</label>
        <Textarea
          placeholder="Describe the image you want to generate..."
          value={values.prompt ?? ""}
          onChange={(e) => update({ prompt: e.target.value })}
          rows={3}
        />
      </div>

      {/* Style */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Style</label>
        <Select
          value={values.style ?? ""}
          onValueChange={(v) => update({ style: v as ImageStyle })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="realistic">Realistic</SelectItem>
            <SelectItem value="artistic">Artistic</SelectItem>
            <SelectItem value="minimalist">Minimalist</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Background */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Background</label>
        <Select
          value={values.backgroundType ?? ""}
          onValueChange={(v) => update({ backgroundType: v as BackgroundType })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select background" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="white">White</SelectItem>
            <SelectItem value="gradient">Gradient</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
            <SelectItem value="transparent">Transparent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Aspect Ratio */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Aspect Ratio</label>
        <Select
          value={values.ratio ?? ""}
          onValueChange={(v) => update({ ratio: v as AspectRatio })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select ratio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1:1">1:1 (Square)</SelectItem>
            <SelectItem value="4:3">4:3 (Landscape)</SelectItem>
            <SelectItem value="16:9">16:9 (Wide)</SelectItem>
            <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
            <SelectItem value="original">Original</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
