"use client";

import { useState, useEffect, useRef } from "react";

interface ServiceInput {
  ai_service: string;
  params: {
    quality?: "standard" | "hd";
    ratio?: string;
    imageSize?: "1K" | "2K" | "4K";
    steps?: number;
  };
  enabled?: boolean;
}

interface UseServiceCreditsReturn {
  credits: Record<string, number>;
  totalCredits: number;
  loading: boolean;
  error: string | null;
}

export function useServiceCredits(
  services: ServiceInput[]
): UseServiceCreditsReturn {
  const [credits, setCredits] = useState<Record<string, number>>({});
  const [totalCredits, setTotalCredits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Only fetch for enabled services
    const enabledServices = services.filter((s) => s.enabled !== false);

    if (enabledServices.length === 0) {
      setCredits({});
      setTotalCredits(0);
      setLoading(false);
      return;
    }

    // Clear previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Abort previous request
    if (abortRef.current) {
      abortRef.current.abort();
    }

    setLoading(true);

    timerRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/pricing/calculate-credits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            services: enabledServices.map((s) => ({
              ai_service: s.ai_service,
              params: s.params,
              count: 1,
            })),
          }),
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to calculate credits");
        }

        const creditMap: Record<string, number> = {};
        let total = 0;

        for (const item of data.breakdown) {
          creditMap[item.service] = item.credits_per_image;
          total += item.subtotal;
        }

        setCredits(creditMap);
        setTotalCredits(total);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        const message =
          err instanceof Error ? err.message : "Failed to fetch pricing";
        setError(message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [services]);

  return { credits, totalCredits, loading, error };
}
