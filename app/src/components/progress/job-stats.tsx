import { Card } from "@/components/ui/card";

interface JobStatsProps {
  successful: number;
  failed: number;
  remaining: number;
}

export function JobStats({ successful, failed, remaining }: JobStatsProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <span className="text-sm text-muted-foreground">Successful:</span>
          <span className="text-sm font-bold text-green-600">{successful}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="text-sm text-muted-foreground">Failed:</span>
          <span className="text-sm font-bold text-red-600">{failed}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
          <span className="text-sm text-muted-foreground">Remaining:</span>
          <span className="text-sm font-bold text-gray-500">{remaining}</span>
        </div>
      </div>
    </Card>
  );
}
