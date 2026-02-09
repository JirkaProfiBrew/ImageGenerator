import { Card } from "@/components/ui/card";

interface ProgressBarProps {
  current: number;
  total: number;
  estimatedTimeRemaining: string;
  aiService: string;
  speedPerImage: string;
}

export function ProgressBar({
  current,
  total,
  estimatedTimeRemaining,
  aiService,
  speedPerImage,
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.min(Math.round((current / total) * 100), 100) : 0;

  return (
    <Card className="p-6">
      <div className="space-y-3">
        <div className="h-5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary animate-pulse transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span>
            {current}/{total} ({percentage}%)
          </span>
          <span className="text-muted-foreground">
            Estimated time remaining: {estimatedTimeRemaining}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          AI Service: {aiService} | Speed: {speedPerImage}
        </p>
      </div>
    </Card>
  );
}
