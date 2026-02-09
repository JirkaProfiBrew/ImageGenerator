"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Mode } from "@/lib/types";

interface ModeToggleProps {
  activeMode: Mode;
}

export function ModeToggle({ activeMode }: ModeToggleProps) {
  return (
    <div className="inline-flex items-center rounded-lg border bg-muted p-1">
      <Link
        href="/test/enhancement"
        className={cn(
          "rounded-md px-5 py-2.5 text-sm font-medium transition-colors",
          activeMode === "enhancement"
            ? "bg-primary text-white"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Enhancement
      </Link>
      <Link
        href="/test/generation"
        className={cn(
          "rounded-md px-5 py-2.5 text-sm font-medium transition-colors",
          activeMode === "generation"
            ? "bg-primary text-white"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Generation
      </Link>
    </div>
  );
}
