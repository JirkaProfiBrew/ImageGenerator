import type { CreditPackage } from "@/lib/types";
import { CreditPackageCard } from "@/components/credits/credit-package-card";

interface CreditPricingProps {
  packages: CreditPackage[];
  onSelectPackage: (id: string) => void;
}

export function CreditPricing({
  packages,
  onSelectPackage,
}: CreditPricingProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Buy Credits</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {packages.map((pkg) => (
          <CreditPackageCard
            key={pkg.id}
            package_={pkg}
            onSelect={onSelectPackage}
          />
        ))}
      </div>
    </section>
  );
}
