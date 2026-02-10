"use client";

import type { AIService, AITestResult } from "@/lib/types";
import { AI_SERVICE_LABELS } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AIServiceSelectorProps {
  value: AIService;
  onChange: (service: AIService) => void;
  testResults?: AITestResult[];
}

const AI_SERVICE_OPTIONS: AIService[] = ["openai_dalle3", "replicate_flux", "google_nano_banana"];

export function AIServiceSelector({
  value,
  onChange,
  testResults,
}: AIServiceSelectorProps) {
  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={(v) => onChange(v as AIService)}>
        <SelectTrigger>
          <SelectValue placeholder="Select AI service" />
        </SelectTrigger>
        <SelectContent>
          {AI_SERVICE_OPTIONS.map((service) => (
            <SelectItem key={service} value={service}>
              {AI_SERVICE_LABELS[service]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {testResults && testResults.length > 0 && (
        <p className="text-xs text-muted-foreground">
          (Based on your test results — best price/quality)
        </p>
      )}
    </div>
  );
}
