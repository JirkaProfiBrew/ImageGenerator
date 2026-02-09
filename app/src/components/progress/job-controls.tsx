"use client";

import { Button } from "@/components/ui/button";

interface JobControlsProps {
  onCancel: () => void;
  onPause: () => void;
  isPaused: boolean;
}

export function JobControls({ onCancel, onPause, isPaused }: JobControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <Button variant="destructive" onClick={onCancel}>
        Cancel Job
      </Button>
      <span className="text-sm text-muted-foreground">
        Ungenerated images will be refunded
      </span>
      <Button variant="secondary" onClick={onPause}>
        {isPaused ? "Resume" : "Pause"}
      </Button>
    </div>
  );
}
