import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UsageProgressBarProps {
  used: number;
  total: number;
}

export function UsageProgressBar({ used, total }: UsageProgressBarProps) {
  const percentage = total > 0 ? Math.min(Math.round((used / total) * 100), 100) : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Usage this month
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {used} / {total} images
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} />
      </CardContent>
    </Card>
  );
}
