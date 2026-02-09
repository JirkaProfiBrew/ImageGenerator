"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ProgressBar } from "@/components/progress/progress-bar";
import { ImageGrid } from "@/components/progress/image-grid";
import { JobControls } from "@/components/progress/job-controls";
import { JobStats } from "@/components/progress/job-stats";

export default function ProgressPage({
  params,
}: {
  params: { jobId: string };
}) {
  void params;

  const router = useRouter();
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back to Projects
      </Link>

      {/* Page title */}
      <h1 className="text-2xl font-bold">Generating 100 images...</h1>

      {/* Progress section */}
      <ProgressBar
        current={42}
        total={100}
        estimatedTimeRemaining="6 minutes"
        aiService="Flux"
        speedPerImage="~5s per image"
      />

      {/* Controls row */}
      <JobControls
        onCancel={() => router.push("/")}
        onPause={() => setIsPaused((prev) => !prev)}
        isPaused={isPaused}
      />

      {/* Live preview section */}
      <ImageGrid
        completedCount={8}
        inProgressCount={4}
        totalImages={100}
      />

      {/* Stats Card */}
      <JobStats successful={40} failed={2} remaining={58} />

      {/* Warning Alert */}
      <Alert>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          2 images failed to generate. They will be automatically retried.
        </AlertDescription>
      </Alert>
    </div>
  );
}
