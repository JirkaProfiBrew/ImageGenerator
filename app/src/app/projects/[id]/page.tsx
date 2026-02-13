"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AIService } from "@/lib/types";
import { AI_SERVICE_LABELS } from "@/lib/types";

// --- Types ---

interface GeneratedImageItem {
  aiService: string;
  displayName: string;
  imageUrl: string | null;
  creditCost: number;
  generationTime: number;
  error?: string;
}

interface SampleItem {
  id: string;
  project_id: string;
  scene_description: string;
  generated_images: GeneratedImageItem[];
  selected_service: string | null;
  is_locked: boolean;
  created_at: string;
}

interface ProjectDetail {
  id: string;
  name: string;
  status: string;
  mode: string;
  base_prompt: string | null;
  ai_service: AIService | null;
  default_ratio: string;
  style: string;
  background: string;
  quality_level: string;
  creativity_level: string;
  consistency_seed: number | null;
  samples: SampleItem[];
}

interface EditedFields {
  name?: string;
  mode?: string;
  base_prompt?: string;
  style?: string;
  background?: string;
  default_ratio?: string;
  quality_level?: string;
  creativity_level?: string;
}

interface SelectedServices {
  dalle3: boolean;
  flux: boolean;
  nanoBanana: boolean;
}

// --- Helpers ---

function getStatusBadge(status: string) {
  switch (status) {
    case "draft":
      return <Badge variant="secondary">Draft</Badge>;
    case "queued":
      return (
        <Badge className="bg-blue-500 text-white border-transparent hover:bg-blue-500/80">
          Locked
        </Badge>
      );
    case "processing":
      return (
        <Badge className="bg-warning text-white border-transparent hover:bg-warning/80">
          Processing
        </Badge>
      );
    case "completed":
      return (
        <Badge className="bg-success text-white border-transparent hover:bg-success/80">
          Completed
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

// --- Component ---

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Editing state
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState<EditedFields>({});
  const [saving, setSaving] = useState(false);

  // Generate sample state
  const [sceneDescription, setSceneDescription] = useState("");
  const [selectedServices, setSelectedServices] = useState<SelectedServices>({
    dalle3: true,
    flux: true,
    nanoBanana: true,
  });
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  // Lock state
  const [lockingId, setLockingId] = useState<string | null>(null);

  const selectedCount =
    Number(selectedServices.dalle3) +
    Number(selectedServices.flux) +
    Number(selectedServices.nanoBanana);

  // --- Data fetching ---

  const fetchProject = useCallback(async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      const json = await response.json();

      if (!json.success) {
        throw new Error(json.error || "Failed to load project");
      }

      setProject({ ...json.project, samples: json.samples ?? [] });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load project";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  // --- Edit handlers ---

  const startEditing = () => {
    if (!project) return;
    setEditing(true);
    setEdited({
      name: project.name,
      mode: project.mode,
      base_prompt: project.base_prompt ?? "",
      style: project.style || "realistic",
      background: project.background || "white",
      default_ratio: project.default_ratio || "1:1",
      quality_level: project.quality_level || "standard",
      creativity_level: project.creativity_level || "medium",
    });
  };

  const cancelEditing = () => {
    setEditing(false);
    setEdited({});
  };

  const handleSaveProject = async () => {
    if (!edited.name?.trim()) {
      setGenerateError("Project name is required");
      return;
    }

    setSaving(true);
    setGenerateError(null);

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: edited.name?.trim(),
          mode: edited.mode,
          base_prompt: edited.base_prompt,
          style: edited.style,
          background: edited.background,
          default_ratio: edited.default_ratio,
          quality_level: edited.quality_level,
          creativity_level: edited.creativity_level,
        }),
      });

      const json = await response.json();

      if (!json.success) {
        throw new Error(json.error || "Failed to save project");
      }

      await fetchProject();
      setEditing(false);
      setEdited({});
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save project";
      setGenerateError(message);
    } finally {
      setSaving(false);
    }
  };

  // --- Auto-save + generate ---

  const handleGenerateSample = async () => {
    // Auto-save if editing
    if (editing && Object.keys(edited).length > 0) {
      setSaving(true);
      try {
        const response = await fetch(`/api/projects/${projectId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: edited.name?.trim(),
            mode: edited.mode,
            base_prompt: edited.base_prompt,
            style: edited.style,
            background: edited.background,
            default_ratio: edited.default_ratio,
            quality_level: edited.quality_level,
            creativity_level: edited.creativity_level,
          }),
        });

        const json = await response.json();
        if (!json.success) throw new Error(json.error || "Failed to save");

        await fetchProject();
        setEditing(false);
        setEdited({});
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to save project";
        setGenerateError(message);
        setSaving(false);
        return;
      } finally {
        setSaving(false);
      }
    }

    if (!sceneDescription.trim() || selectedCount === 0) return;

    setGenerating(true);
    setGenerateError(null);

    try {
      const response = await fetch(`/api/projects/${projectId}/samples`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scene_description: sceneDescription,
          selected_services: selectedServices,
        }),
      });

      const json = await response.json();

      if (!json.success) {
        throw new Error(json.error || "Failed to generate sample");
      }

      setProject((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          samples: [json.sample, ...prev.samples],
        };
      });

      setSceneDescription("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to generate sample";
      setGenerateError(message);
    } finally {
      setGenerating(false);
    }
  };

  // --- Lock handler ---

  const handleLockStyle = async (
    sampleId: string,
    selectedService: AIService
  ) => {
    const serviceName =
      AI_SERVICE_LABELS[selectedService] ?? selectedService;

    const confirmed = confirm(
      `Lock style with ${serviceName}?\n\n` +
        `This will:\n` +
        `- Set project status to "locked"\n` +
        `- Use ${serviceName} for all future bulk generations\n` +
        `- Apply this style consistently across all images\n\n` +
        `You can still edit the project settings later if needed.`
    );

    if (!confirmed) return;

    setLockingId(sampleId);

    try {
      const response = await fetch(
        `/api/projects/${projectId}/samples/${sampleId}/lock`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ selected_service: selectedService }),
        }
      );

      const json = await response.json();

      if (!json.success) {
        throw new Error(json.error || "Failed to lock style");
      }

      await fetchProject();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to lock style";
      setGenerateError(message);
    } finally {
      setLockingId(null);
    }
  };

  // --- Loading/Error states ---

  if (loading) {
    return (
      <div className="space-y-8">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Back to Projects
        </Link>
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="space-y-8">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Back to Projects
        </Link>
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          Error: {error || "Project not found"}
        </div>
      </div>
    );
  }

  const isEditable = project.status === "draft" || project.status === "queued";

  // --- Render ---

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back to Projects
      </Link>

      {/* ========== EDITABLE PROJECT HEADER ========== */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            {/* Name */}
            <div className="flex-1">
              {editing ? (
                <Input
                  value={edited.name ?? ""}
                  onChange={(e) =>
                    setEdited((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Project Name"
                  className="text-2xl font-bold h-auto py-1"
                />
              ) : (
                <CardTitle className="text-2xl">{project.name}</CardTitle>
              )}
            </div>

            {/* Status + Edit buttons */}
            <div className="flex items-center gap-2 shrink-0">
              {getStatusBadge(project.status)}

              {project.ai_service && project.status === "queued" && (
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 border border-blue-300 rounded-lg">
                  <span className="text-lg">🔒</span>
                  <div className="text-sm">
                    <div className="text-blue-900 font-semibold">
                      {AI_SERVICE_LABELS[project.ai_service]}
                    </div>
                    <div className="text-blue-700 text-xs">
                      Locked for bulk
                    </div>
                  </div>
                </div>
              )}

              {!editing && isEditable && (
                <Button
                  variant={project.status === "queued" ? "outline" : "secondary"}
                  size="sm"
                  onClick={() => {
                    if (project.status === "queued") {
                      if (
                        !confirm(
                          "Warning: This project style is locked.\n\nEditing may affect consistency with existing samples and bulk generations.\n\nAre you sure you want to continue?"
                        )
                      )
                        return;
                    }
                    startEditing();
                  }}
                >
                  {project.status === "queued" ? "Edit (Warning)" : "Edit"}
                </Button>
              )}

              {editing && (
                <>
                  <Button size="sm" onClick={handleSaveProject} disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={cancelEditing}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Mode */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Mode</p>
            {editing ? (
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="generation"
                    checked={(edited.mode ?? project.mode) === "generation"}
                    onChange={() =>
                      setEdited((prev) => ({ ...prev, mode: "generation" }))
                    }
                    className="h-4 w-4"
                  />
                  <span className="text-sm">
                    Generation (create new images from text)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="enhancement"
                    checked={(edited.mode ?? project.mode) === "enhancement"}
                    onChange={() =>
                      setEdited((prev) => ({ ...prev, mode: "enhancement" }))
                    }
                    className="h-4 w-4"
                  />
                  <span className="text-sm">
                    Enhancement (improve existing images)
                  </span>
                </label>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground capitalize">
                {project.mode}
              </p>
            )}
          </div>

          {/* Base Prompt */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Base Style Prompt</p>
            {editing ? (
              <>
                <Textarea
                  value={edited.base_prompt ?? ""}
                  onChange={(e) =>
                    setEdited((prev) => ({
                      ...prev,
                      base_prompt: e.target.value,
                    }))
                  }
                  placeholder="e.g., 1960s style, warm colors, cozy bar atmosphere, vintage clothing, film grain effect"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  This prompt will be applied to all generated images in this
                  project
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md border">
                {project.base_prompt || (
                  <span className="italic text-muted-foreground/60">
                    Not set yet - click Edit to add
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Style, Background, Ratio - 3 column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Style */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Style</p>
              {editing ? (
                <Select
                  value={edited.style ?? project.style ?? "realistic"}
                  onValueChange={(v) =>
                    setEdited((prev) => ({ ...prev, style: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realistic">Realistic</SelectItem>
                    <SelectItem value="artistic">Artistic</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="3d">3D Render</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded-md border capitalize">
                  {project.style || "realistic"}
                </p>
              )}
            </div>

            {/* Background */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Background</p>
              {editing ? (
                <Select
                  value={edited.background ?? project.background ?? "white"}
                  onValueChange={(v) =>
                    setEdited((prev) => ({ ...prev, background: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="white">White Studio</SelectItem>
                    <SelectItem value="gradient">Gradient</SelectItem>
                    <SelectItem value="transparent">Transparent</SelectItem>
                    <SelectItem value="custom">Custom / Contextual</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded-md border capitalize">
                  {project.background || "white"}
                </p>
              )}
            </div>

            {/* Aspect Ratio */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Aspect Ratio</p>
              {editing ? (
                <Select
                  value={edited.default_ratio ?? project.default_ratio}
                  onValueChange={(v) =>
                    setEdited((prev) => ({ ...prev, default_ratio: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1:1">1:1 (Square)</SelectItem>
                    <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                    <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                    <SelectItem value="4:3">4:3</SelectItem>
                    <SelectItem value="3:2">3:2</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded-md border">
                  {project.default_ratio}
                </p>
              )}
            </div>
          </div>

          {/* Quality & Creativity - 2 column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quality Level */}
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Quality Level
                {editing && (
                  <span className="ml-2 text-xs text-muted-foreground font-normal">
                    (resolution &amp; detail)
                  </span>
                )}
              </p>
              {editing ? (
                <Select
                  value={
                    edited.quality_level ??
                    project.quality_level ??
                    "standard"
                  }
                  onValueChange={(v) =>
                    setEdited((prev) => ({ ...prev, quality_level: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">
                      Standard (fastest, cheapest)
                    </SelectItem>
                    <SelectItem value="high">High (balanced)</SelectItem>
                    <SelectItem value="ultra">
                      Ultra (best quality, slower)
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded-md border capitalize">
                  {project.quality_level || "standard"}
                </p>
              )}
            </div>

            {/* Creativity Level */}
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Creativity Level
                {editing && (
                  <span className="ml-2 text-xs text-muted-foreground font-normal">
                    (prompt strictness)
                  </span>
                )}
              </p>
              {editing ? (
                <Select
                  value={
                    edited.creativity_level ??
                    project.creativity_level ??
                    "medium"
                  }
                  onValueChange={(v) =>
                    setEdited((prev) => ({
                      ...prev,
                      creativity_level: v,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      Low (precise, follows prompt strictly)
                    </SelectItem>
                    <SelectItem value="medium">
                      Medium (balanced)
                    </SelectItem>
                    <SelectItem value="high">
                      High (creative, interpretive)
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded-md border capitalize">
                  {project.creativity_level || "medium"}
                </p>
              )}
            </div>
          </div>

          {/* Consistency seed display for locked projects */}
          {project.status === "queued" && project.consistency_seed && (
            <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-md border">
              Consistency Seed: {project.consistency_seed}{" "}
              <span className="text-muted-foreground/60">
                (ensures similar results across bulk generations)
              </span>
            </div>
          )}

          {/* Auto-save tip */}
          {editing && (
            <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Changes will also be saved automatically
                when you generate a sample.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ========== GENERATE SAMPLE SECTION ========== */}
      {project.status === "draft" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                1
              </span>
              Generate Sample
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Scene description */}
            <div className="space-y-2">
              <label htmlFor="scene" className="text-sm font-medium">
                Scene Description
              </label>
              <Textarea
                id="scene"
                value={sceneDescription}
                onChange={(e) => setSceneDescription(e.target.value)}
                placeholder="Describe the scene you want to generate..."
                rows={3}
              />
            </div>

            {/* Service selection */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Select AI Services</p>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedServices.dalle3}
                    onCheckedChange={(checked) =>
                      setSelectedServices((prev) => ({
                        ...prev,
                        dalle3: checked === true,
                      }))
                    }
                  />
                  <span className="text-sm">DALL-E 3 (15 credits)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedServices.flux}
                    onCheckedChange={(checked) =>
                      setSelectedServices((prev) => ({
                        ...prev,
                        flux: checked === true,
                      }))
                    }
                  />
                  <span className="text-sm">Flux Pro (10 credits)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedServices.nanoBanana}
                    onCheckedChange={(checked) =>
                      setSelectedServices((prev) => ({
                        ...prev,
                        nanoBanana: checked === true,
                      }))
                    }
                  />
                  <span className="text-sm">Nano Banana Pro (6 credits)</span>
                </label>
              </div>

              {selectedCount === 0 && (
                <p className="text-sm text-destructive">
                  Select at least one AI service
                </p>
              )}
            </div>

            {/* Generate button */}
            <Button
              onClick={handleGenerateSample}
              disabled={
                generating ||
                saving ||
                !sceneDescription.trim() ||
                selectedCount === 0
              }
            >
              {generating
                ? "Generating..."
                : saving
                  ? "Saving..."
                  : "Generate Sample"}
            </Button>

            {generating && (
              <p className="text-sm text-muted-foreground">
                This may take 20-30 seconds...
              </p>
            )}

            {/* Generate error */}
            {generateError && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                Error: {generateError}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ========== SAMPLES LIST ========== */}
      {project.samples.length > 0 && (
        <>
          <Separator />
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Samples</h2>

            {project.samples.map((sample) => {
              const images = (
                Array.isArray(sample.generated_images)
                  ? sample.generated_images
                  : []
              ) as GeneratedImageItem[];

              const getServiceName = (service: string) =>
                service === "openai_dalle3"
                  ? "DALL-E 3"
                  : service === "replicate_flux"
                    ? "Flux Pro"
                    : service === "google_nano_banana"
                      ? "Nano Banana Pro"
                      : service.replace(/_/g, " ");

              return (
                <div
                  key={sample.id}
                  className="border rounded-lg p-6 bg-card"
                >
                  {/* Sample header */}
                  <div className="mb-4">
                    <p className="font-medium text-gray-900">
                      {sample.scene_description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Generated{" "}
                      {new Date(sample.created_at).toLocaleString()}
                    </p>
                  </div>

                  {/* Image grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {images.map((img, idx) => (
                      <div
                        key={idx}
                        className="border rounded-lg overflow-hidden bg-white"
                      >
                        {img.imageUrl ? (
                          <img
                            src={img.imageUrl}
                            alt={`${getServiceName(img.aiService)} result`}
                            className="w-full h-64 object-cover"
                          />
                        ) : (
                          <div className="w-full h-64 bg-gray-100 flex items-center justify-center p-4">
                            <p className="text-destructive text-sm text-center">
                              Error: {img.error || "Failed to generate"}
                            </p>
                          </div>
                        )}

                        <div className="p-4 border-t">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {getServiceName(img.aiService)}
                          </h3>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p>
                              Cost:{" "}
                              <span className="font-medium">
                                {img.creditCost} credits
                              </span>
                            </p>
                            <p>
                              Time:{" "}
                              <span className="font-medium">
                                {img.generationTime}s
                              </span>
                            </p>
                          </div>

                          {/* "Selected" indicator on image card */}
                          {sample.is_locked &&
                            sample.selected_service === img.aiService && (
                              <Badge className="mt-2 bg-success text-white border-transparent hover:bg-success/80">
                                Selected
                              </Badge>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Lock style section - unified interface */}
                  {!sample.is_locked && project.status === "draft" ? (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl">
                          🔒
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-lg mb-2">
                            Lock This Style for Bulk Generation
                          </h4>
                          <p className="text-sm text-gray-700 mb-4">
                            Choose which AI service gave the best result.
                            This service will be used for all future bulk
                            generations in this project. Consider quality,
                            cost, and generation time.
                          </p>
                        </div>
                      </div>

                      {/* Service selection buttons */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {images.map((img, idx) => {
                          const hasError = !img.imageUrl || !!img.error;

                          return (
                            <button
                              key={idx}
                              onClick={() =>
                                handleLockStyle(
                                  sample.id,
                                  img.aiService as AIService
                                )
                              }
                              disabled={hasError || lockingId === sample.id}
                              className={`
                                relative p-4 rounded-lg border-2 transition-all text-left
                                ${
                                  hasError
                                    ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
                                    : lockingId === sample.id
                                      ? "border-blue-300 bg-blue-50 cursor-wait"
                                      : "border-blue-600 bg-white hover:bg-blue-50 hover:shadow-md cursor-pointer"
                                }
                              `}
                            >
                              <div className="text-center">
                                <div className="font-semibold text-gray-900 mb-2">
                                  {getServiceName(img.aiService)}
                                </div>
                                <div className="text-xs text-gray-600 space-y-1">
                                  <div>
                                    Cost:{" "}
                                    <strong>
                                      {img.creditCost} credits/image
                                    </strong>
                                  </div>
                                  <div>
                                    Speed:{" "}
                                    <strong>~{img.generationTime}s</strong>
                                  </div>
                                </div>
                                {hasError && (
                                  <div className="mt-2 text-xs text-destructive">
                                    Generation failed
                                  </div>
                                )}
                                {!hasError && (
                                  <div className="mt-3 text-sm font-medium text-blue-600">
                                    {lockingId === sample.id
                                      ? "Locking..."
                                      : "Lock & Use This →"}
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-4 text-xs text-gray-600 bg-white/50 p-3 rounded">
                        <strong>Tip:</strong> You can compare quality vs
                        cost. DALL-E 3 is highest quality but most
                        expensive. Flux Pro is a good balance. Nano Banana
                        is fastest and cheapest.
                      </div>
                    </div>
                  ) : sample.is_locked ? (
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          ✓
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-green-900">
                            Style Locked
                          </p>
                          <p className="text-sm text-green-700">
                            Using:{" "}
                            <strong className="font-semibold">
                              {sample.selected_service
                                ? getServiceName(sample.selected_service)
                                : "Unknown"}
                            </strong>{" "}
                            for all bulk generations
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Empty samples state */}
      {project.samples.length === 0 && project.status === "draft" && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-2">
            <p className="text-muted-foreground text-center">
              No samples yet. Generate your first sample above to compare AI
              services.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Bulk CTA (only if locked/queued) */}
      {project.status === "queued" && (
        <div className="rounded-lg border bg-card p-10 text-center space-y-4">
          <h3 className="text-xl font-semibold">Ready for bulk generation!</h3>
          <p className="text-sm text-muted-foreground">
            Your style is locked. You can now scale this across all your
            products with bulk generation.
          </p>
          <Button
            asChild
            className="bg-success text-white hover:bg-success/90"
            size="lg"
          >
            <Link href="/bulk/setup">Start Bulk Generation</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
