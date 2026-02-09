import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const projects = [
  {
    name: "Q1 Product Catalog",
    slug: "project-1",
    images: 50,
    cost: "$12.50",
    date: "Yesterday",
    status: "Completed" as const,
  },
  {
    name: "Summer Collection",
    slug: "project-2",
    images: 120,
    cost: "$28.40",
    date: "3 days ago",
    status: "In Progress" as const,
  },
  {
    name: "Holiday Promo",
    slug: "project-3",
    images: 35,
    cost: "$8.75",
    date: "1 week ago",
    status: "Completed" as const,
  },
  {
    name: "Client: TechStore",
    slug: "project-4",
    images: 200,
    cost: "$48.00",
    date: "2 weeks ago",
    status: "Completed" as const,
  },
];

const stats = [
  { value: "405", label: "Total Images" },
  { value: "$97.65", label: "Total Spent" },
  { value: "$0.24", label: "Avg Cost/Image" },
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/results/${project.slug}`}
              className="group"
            >
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {project.name}
                    </CardTitle>
                    <Badge
                      className={
                        project.status === "Completed"
                          ? "border-transparent bg-green-100 text-green-800 hover:bg-green-100"
                          : "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Images</span>
                    <span className="font-medium">
                      {project.images} images
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cost</span>
                    <span className="font-medium">{project.cost}</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <span className="text-xs text-muted-foreground">
                    {project.date}
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Usage card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Usage this month</CardTitle>
            <span className="text-sm text-muted-foreground">
              150 / 500 images
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={30} />
        </CardContent>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
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
