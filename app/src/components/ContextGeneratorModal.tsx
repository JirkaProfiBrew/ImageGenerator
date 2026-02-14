"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Template {
  id: string;
  name: string;
  description: string;
}

interface ContextGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string, filename: string) => void;
  projectId: string;
}

export function ContextGeneratorModal({
  isOpen,
  onClose,
  onSave,
  projectId,
}: ContextGeneratorModalProps) {
  const [step, setStep] = useState<"template" | "prompt" | "preview">(
    "template"
  );
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load templates when modal opens
  useEffect(() => {
    if (isOpen) {
      fetch("/api/ai/generate-context")
        .then((res) => res.json())
        .then((data) => setTemplates(data.templates || []))
        .catch(() => {});
    }
  }, [isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setStep("template");
      setSelectedTemplate("");
      setUserPrompt("");
      setGeneratedText("");
      setFilename("");
      setError("");
    }
  }, [isOpen]);

  const handleGenerate = async () => {
    if (!userPrompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/ai/generate-context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template: selectedTemplate,
          prompt: userPrompt,
          project_id: projectId,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Generation failed");
      }

      setGeneratedText(data.generated_text);
      setFilename(data.filename);
      setStep("preview");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Generation failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    onSave(generatedText, filename);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border">
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Generate Context with AI</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Create detailed text context using GPT-4o-mini (1 credit, fixed)
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Template Selection */}
          {step === "template" && (
            <div className="space-y-4">
              <h3 className="font-semibold">Choose a template:</h3>
              <div className="space-y-2">
                {templates.map((template) => (
                  <label
                    key={template.id}
                    className={`flex items-start gap-3 p-3 border rounded-md cursor-pointer transition-colors ${
                      selectedTemplate === template.id
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="template"
                      value={template.id}
                      checked={selectedTemplate === template.id}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      className="mt-1 h-4 w-4"
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {template.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {template.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={() => setStep("prompt")}
                  disabled={!selectedTemplate}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Prompt Input */}
          {step === "prompt" && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm">
                  {templates.find((t) => t.id === selectedTemplate)?.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Describe what you want in your own words
                </p>

                <Textarea
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder='e.g., healthy food - fresh ingredients, balanced portions, vibrant colors, natural presentation'
                  rows={4}
                  disabled={loading}
                />
              </div>

              {/* Example prompts */}
              <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
                <p className="text-xs font-medium text-blue-900 mb-1">
                  Example prompts:
                </p>
                <ul className="text-xs text-blue-800 space-y-0.5">
                  <li>
                    &bull; &quot;luxury fashion accessories - elegant, timeless, high-end
                    materials&quot;
                  </li>
                  <li>
                    &bull; &quot;minimalist home decor - clean lines, neutral palette,
                    natural materials&quot;
                  </li>
                  <li>
                    &bull; &quot;adventure travel photography - dynamic angles, golden
                    hour, authentic moments&quot;
                  </li>
                </ul>
              </div>

              {error && (
                <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* Cost info */}
              <div className="rounded-md border bg-muted/50 p-3 text-xs flex items-center justify-between">
                <span className="text-muted-foreground">Cost:</span>
                <span className="font-semibold">1 credit <span className="font-normal text-muted-foreground">(fixed)</span></span>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep("template")}
                  disabled={loading}
                >
                  Back
                </Button>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleGenerate}
                    disabled={loading || !userPrompt.trim()}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Generating...
                      </span>
                    ) : (
                      "Generate Context"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preview & Edit */}
          {step === "preview" && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm">Generated Context</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Review and edit before saving to your project
                </p>

                <Textarea
                  value={generatedText}
                  onChange={(e) => setGeneratedText(e.target.value)}
                  className="font-mono text-xs"
                  rows={16}
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Filename: {filename}
              </p>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep("prompt")}>
                  Back
                </Button>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setGeneratedText("");
                      setStep("prompt");
                    }}
                  >
                    Regenerate
                  </Button>
                  <Button variant="outline" onClick={onClose}>
                    Discard
                  </Button>
                  <Button onClick={handleSave}>Save to Project</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
