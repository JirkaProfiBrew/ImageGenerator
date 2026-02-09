import type { CostEstimate } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CostCalculatorProps {
  estimate: CostEstimate;
}

export function CostCalculator({ estimate }: CostCalculatorProps) {
  return (
    <Card className="border-2 border-primary shadow-md">
      <CardHeader>
        <CardTitle>Cost Estimate</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Breakdown</p>
          <p className="text-sm font-medium">
            {estimate.totalImages} images x {estimate.creditsPerImage} credits ={" "}
            {estimate.totalCredits} credits
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Total Cost</p>
          <p className="text-2xl font-bold text-primary">
            ${estimate.dollarAmount.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Estimated Time</p>
          <p className="text-sm font-medium">{estimate.estimatedTime}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Current Balance</p>
          <p className="text-sm font-medium text-green-600">
            {estimate.currentBalance} credits
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Balance After Job</p>
          <p className="text-sm font-medium">{estimate.balanceAfter} credits</p>
        </div>
      </CardContent>
    </Card>
  );
}
