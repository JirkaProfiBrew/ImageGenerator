"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types";

const statusStyles: Record<string, string> = {
  completed:
    "border-transparent bg-green-100 text-green-800 hover:bg-green-100",
  processing:
    "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100",
  failed: "border-transparent bg-red-100 text-red-800 hover:bg-red-100",
  queued:
    "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  draft: "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-100",
  cancelled:
    "border-transparent bg-gray-100 text-gray-600 hover:bg-gray-100",
};

const statusLabels: Record<string, string> = {
  completed: "Completed",
  processing: "In Progress",
  failed: "Failed",
  queued: "Queued",
  draft: "Draft",
  cancelled: "Cancelled",
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/results/${project.id}`} className="group">
      <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{project.name}</CardTitle>
            <Badge
              className={statusStyles[project.status] ?? statusStyles.draft}
            >
              {statusLabels[project.status] ?? project.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Images</span>
            <span className="font-medium">{project.totalImages} images</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Credits</span>
            <span className="font-medium">{project.totalCreditsSpent}</span>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <span className="text-xs text-muted-foreground">
            {project.createdAt.toLocaleDateString()}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
