"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AIService } from "@/lib/types";
import { AI_SERVICE_LABELS } from "@/lib/types";

interface ProjectListItem {
  id: string;
  name: string;
  status: string;
  base_prompt: string | null;
  ai_service_id: AIService | null;
  default_ratio: string;
  created_at: string;
}

function getStatusBadge(status: string) {
  switch (status) {
    case "draft":
      return <Badge variant="secondary">Draft</Badge>;
    case "queued":
      return <Badge className="bg-blue-500 text-white border-transparent hover:bg-blue-500/80">Locked</Badge>;
    case "processing":
      return <Badge className="bg-warning text-white border-transparent hover:bg-warning/80">Processing</Badge>;
    case "completed":
      return <Badge className="bg-success text-white border-transparent hover:bg-success/80">Completed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");
        const json = await response.json();

        if (!json.success) {
          throw new Error(json.error || "Failed to load projects");
        }

        setProjects(json.projects);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load projects";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <Button asChild>
          <Link href="/projects/new">New Project</Link>
        </Button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          Error: {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && projects.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
            <p className="text-muted-foreground text-center">
              You don&apos;t have any projects yet. Create your first project to get started.
            </p>
            <Button asChild>
              <Link href="/projects/new">Create Your First Project</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Projects grid */}
      {!loading && !error && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{project.name}</CardTitle>
                    {getStatusBadge(project.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {truncateText(project.base_prompt ?? "", 100)}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{(project.ai_service_id && AI_SERVICE_LABELS[project.ai_service_id as keyof typeof AI_SERVICE_LABELS]) ?? project.ai_service_id ?? "Not set"}</span>
                    <span>&middot;</span>
                    <span>{project.default_ratio}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Created {formatDate(project.created_at)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
