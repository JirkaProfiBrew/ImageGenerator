"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CreditPackage } from "@/lib/types";

interface CreditPackageCardProps {
  package_: CreditPackage;
  onSelect: (id: string) => void;
}

export function CreditPackageCard({
  package_,
  onSelect,
}: CreditPackageCardProps) {
  return (
    <Card
      className={cn(
        "relative flex flex-col text-center",
        package_.isPopular
          ? "border-2 border-primary shadow-md"
          : "border-border"
      )}
    >
      {package_.isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
          Most Popular
        </span>
      )}

      <CardContent className="flex flex-1 flex-col pt-6">
        <p className="text-lg font-semibold">{package_.name}</p>

        <p className="mt-2 text-3xl font-bold">
          {package_.credits.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground">credits</p>

        <p className="mt-4 text-2xl font-bold">${package_.price}</p>
        <p className="text-sm text-muted-foreground">
          {package_.perCredit}/credit
        </p>

        {package_.discountPercent > 0 ? (
          <p className="mt-2 text-sm font-medium text-success">
            Save {package_.discountPercent}%
          </p>
        ) : (
          <p className="mt-2 text-sm">&nbsp;</p>
        )}

        <div className="mt-auto pt-4">
          <Button
            variant={package_.isPopular ? "default" : "secondary"}
            className="w-full"
            onClick={() => onSelect(package_.id)}
          >
            Buy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
