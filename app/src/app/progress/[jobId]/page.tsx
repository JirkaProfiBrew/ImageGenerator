import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default async function ProgressPage({
  params,
}: {
  params: { jobId: string };
}) {
  // jobId will be used for fetching real job data in Phase 5
  void params;

  const completedCount = 8;
  const inProgressCount = 4;

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
      <Card className="p-6">
        <div className="space-y-3">
          {/* Large progress bar */}
          <div className="h-5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary animate-pulse"
              style={{ width: "42%" }}
            />
          </div>

          {/* Progress info */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">42/100 (42%)</span>
            <span className="text-sm text-muted-foreground">
              Estimated time remaining: 6 minutes
            </span>
          </div>

          {/* Service info */}
          <p className="text-xs text-muted-foreground">
            AI Service: Flux | Speed: ~5s per image
          </p>
        </div>
      </Card>

      {/* Controls row */}
      <div className="flex items-center gap-3">
        <Button variant="destructive">Cancel Job</Button>
        <span className="text-sm text-muted-foreground">
          Ungenerated images will be refunded
        </span>
        <Button variant="secondary">Pause</Button>
      </div>

      {/* Live preview section */}
      <div className="space-y-3">
        {/* Header with pulsing dot */}
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
          <span className="text-sm font-medium">
            Generated Images (live update)
          </span>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Completed items */}
          {Array.from({ length: completedCount }).map((_, i) => (
            <div
              key={`completed-${i}`}
              className="relative aspect-square rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 border"
            >
              <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white text-xs">
                &#10003;
              </div>
            </div>
          ))}

          {/* In-progress items */}
          {Array.from({ length: inProgressCount }).map((_, i) => (
            <div
              key={`progress-${i}`}
              className="flex flex-col items-center justify-center gap-2 aspect-square rounded-lg bg-muted border"
            >
              <div className="h-6 w-6 rounded-full border-2 border-muted-foreground/20 border-t-primary animate-spin" />
              <span className="text-xs text-muted-foreground">
                Generating...
              </span>
            </div>
          ))}
        </div>

        {/* Below grid text */}
        <p className="text-sm text-muted-foreground">
          42 of 100 images generated...
        </p>
      </div>

      {/* Stats Card */}
      <Card className="p-6">
        <div className="flex gap-6 flex-wrap">
          {/* Successful */}
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">Successful:</span>
            <span className="text-sm font-bold text-green-600">40</span>
          </div>

          {/* Failed */}
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="text-sm text-muted-foreground">Failed:</span>
            <span className="text-sm font-bold text-red-600">2</span>
          </div>

          {/* Remaining */}
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-gray-400" />
            <span className="text-sm text-muted-foreground">Remaining:</span>
            <span className="text-sm font-bold text-gray-500">58</span>
          </div>
        </div>
      </Card>

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
