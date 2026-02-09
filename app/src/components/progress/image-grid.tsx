interface ImageGridProps {
  completedCount: number;
  inProgressCount: number;
  totalImages: number;
}

export function ImageGrid({
  completedCount,
  inProgressCount,
  totalImages,
}: ImageGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
        </span>
        <h3 className="text-sm font-medium">Generated Images (live update)</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: completedCount }).map((_, i) => (
          <div
            key={`completed-${i}`}
            className="relative aspect-square rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50"
          >
            <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        ))}

        {Array.from({ length: inProgressCount }).map((_, i) => (
          <div
            key={`in-progress-${i}`}
            className="relative flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border bg-muted"
          >
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-primary" />
            <span className="text-xs text-muted-foreground">Generating...</span>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        {completedCount} of {totalImages} images generated...
      </p>
    </div>
  );
}
