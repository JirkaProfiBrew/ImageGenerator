import { Card, CardContent } from "@/components/ui/card";

interface QuickStatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
}

export function QuickStatsCard({ title, value, subtitle }: QuickStatsCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
        {subtitle && (
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
