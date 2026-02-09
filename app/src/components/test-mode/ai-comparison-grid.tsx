"use client";

import { AIComparisonCard } from "@/components/test-mode/ai-comparison-card";
import type { AIService, AITestResult } from "@/lib/types";

interface AIComparisonGridProps {
  results: AITestResult[];
  onSelectAI: (service: AIService) => void;
}

export function AIComparisonGrid({
  results,
  onSelectAI,
}: AIComparisonGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {results.map((result) => (
        <AIComparisonCard
          key={result.aiService}
          result={result}
          onSelect={onSelectAI}
          highlighted={result.isBestValue === true}
        />
      ))}
    </div>
  );
}
