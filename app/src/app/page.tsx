import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectGrid } from "@/components/dashboard/project-grid";
import { QuickStatsCard } from "@/components/dashboard/quick-stats-card";
import { UsageProgressBar } from "@/components/dashboard/usage-progress-bar";
import type { Project } from "@/lib/types";

const projects: Project[] = [
  {
    id: "project-1",
    userId: "user-1",
    name: "Q1 Product Catalog",
    mode: "enhancement",
    aiService: "dalle3",
    totalImages: 50,
    totalCreditsSpent: 12.5,
    status: "completed",
    settings: { backgroundStyle: "white", enhancementLevel: "premium" },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday
  },
  {
    id: "project-2",
    userId: "user-1",
    name: "Summer Collection",
    mode: "generation",
    aiService: "flux_pro",
    totalImages: 120,
    totalCreditsSpent: 28.4,
    status: "processing",
    settings: { style: "commercial", ratio: "1:1" },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: "project-3",
    userId: "user-1",
    name: "Holiday Promo",
    mode: "enhancement",
    aiService: "sd_xl",
    totalImages: 35,
    totalCreditsSpent: 8.75,
    status: "completed",
    settings: { backgroundStyle: "gradient", enhancementLevel: "basic" },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  },
  {
    id: "project-4",
    userId: "user-1",
    name: "Client: TechStore",
    mode: "generation",
    aiService: "dalle3",
    totalImages: 200,
    totalCreditsSpent: 48.0,
    status: "completed",
    settings: { style: "realistic", ratio: "4:3" },
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page title */}
      <h1 className="text-2xl font-bold">Projects</h1>

      {/* CTA buttons */}
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/test/enhancement">+ New Project</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/bulk/setup">Upload CSV</Link>
        </Button>
      </div>

      {/* Recent Projects */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Projects</h2>
        <ProjectGrid projects={projects} />
      </section>

      {/* Usage card */}
      <UsageProgressBar used={150} total={500} />

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <QuickStatsCard title="Total Images" value="405" />
        <QuickStatsCard title="Total Spent" value="$97.65" />
        <QuickStatsCard title="Avg Cost/Image" value="$0.24" />
      </div>

      {/* View all projects link */}
      <div className="text-center">
        <Link
          href="/projects"
          className="text-sm font-medium text-primary hover:underline"
        >
          View all projects &rarr;
        </Link>
      </div>
    </div>
  );
}
