"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ProjectContext, ReferenceImage, TextDocument } from "@/lib/types";

interface ProjectContextUploadProps {
  context: ProjectContext;
  onContextChange: (context: ProjectContext) => void;
  disabled?: boolean;
}

export function ProjectContextUpload({
  context,
  onContextChange,
  disabled = false,
}: ProjectContextUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const refImages = context.reference_images ?? [];
  const textDocs = context.text_documents ?? [];

  // Upload file via /api/upload → Supabase Storage
  const uploadFile = async (
    file: File,
    type: "reference_image" | "text_document"
  ): Promise<{ url: string; filename: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Upload failed");
    }

    return data;
  };

  // Upload reference images
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remaining = 14 - refImages.length;
    if (remaining <= 0) return;

    const filesToProcess = Array.from(files).slice(0, remaining);

    setUploading(true);
    setUploadError(null);

    try {
      const newImages: ReferenceImage[] = [];

      for (const file of filesToProcess) {
        if (!file.type.startsWith("image/")) {
          throw new Error(`${file.name} is not an image file`);
        }
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`${file.name} exceeds 10MB limit`);
        }

        setUploadingFile(file.name);
        const data = await uploadFile(file, "reference_image");

        newImages.push({
          id: crypto.randomUUID(),
          url: data.url,
          filename: data.filename,
          uploaded_at: new Date().toISOString(),
        });
      }

      onContextChange({
        ...context,
        reference_images: [...refImages, ...newImages],
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Upload failed";
      console.error("[Context] Image upload error:", message);
      setUploadError(message);
    } finally {
      setUploading(false);
      setUploadingFile(null);
      e.target.value = "";
    }
  };

  // Upload text documents
  const handleDocumentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadError(null);

    try {
      const newDocs: TextDocument[] = [];

      for (const file of Array.from(files)) {
        const validExts = [".txt", ".md", ".pdf"];
        const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
        if (!validExts.includes(ext)) {
          throw new Error(
            `${file.name}: only .txt, .md, .pdf files are supported`
          );
        }
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`${file.name} exceeds 10MB limit`);
        }

        setUploadingFile(file.name);
        const data = await uploadFile(file, "text_document");

        newDocs.push({
          id: crypto.randomUUID(),
          url: data.url,
          filename: data.filename,
          uploaded_at: new Date().toISOString(),
        });
      }

      onContextChange({
        ...context,
        text_documents: [...textDocs, ...newDocs],
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Upload failed";
      console.error("[Context] Document upload error:", message);
      setUploadError(message);
    } finally {
      setUploading(false);
      setUploadingFile(null);
      e.target.value = "";
    }
  };

  const removeImage = (id: string) => {
    onContextChange({
      ...context,
      reference_images: refImages.filter((img) => img.id !== id),
    });
  };

  const removeDocument = (id: string) => {
    onContextChange({
      ...context,
      text_documents: textDocs.filter((doc) => doc.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      {/* Error display */}
      {uploadError && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {uploadError}
        </div>
      )}

      {/* Upload progress */}
      {uploading && uploadingFile && (
        <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 flex items-center gap-2">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
          Uploading: {uploadingFile}
        </div>
      )}

      {/* Reference Images */}
      <div className="space-y-2">
        <p className="text-sm font-medium">
          Reference Images ({refImages.length}/14)
          <span className="ml-2 text-xs text-muted-foreground font-normal">
            Style references, product examples
          </span>
        </p>

        {refImages.length > 0 && (
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {refImages.map((img) => (
              <div key={img.id} className="relative group">
                <img
                  src={img.url}
                  alt={img.filename}
                  className="w-full h-20 object-cover rounded border"
                />
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="absolute top-0.5 right-0.5 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    &times;
                  </button>
                )}
                <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                  {img.filename}
                </p>
              </div>
            ))}
          </div>
        )}

        {!disabled && refImages.length < 14 && (
          <label className="inline-block cursor-pointer">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              asChild
            >
              <span>
                {uploading ? "Uploading..." : "+ Add Reference Images"}
              </span>
            </Button>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={disabled || uploading}
              className="hidden"
            />
          </label>
        )}

        {refImages.length >= 14 && (
          <p className="text-xs text-warning">
            Maximum 14 reference images reached
          </p>
        )}
      </div>

      {/* Text Documents */}
      <div className="space-y-2">
        <p className="text-sm font-medium">
          Text Documents ({textDocs.length})
          <span className="ml-2 text-xs text-muted-foreground font-normal">
            Brand guidelines, descriptions (.txt, .md, .pdf)
          </span>
        </p>

        {textDocs.length > 0 && (
          <div className="space-y-1.5">
            {textDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between bg-background p-2 rounded border text-sm"
              >
                <span className="truncate flex-1">{doc.filename}</span>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => removeDocument(doc.id)}
                    className="text-destructive hover:text-destructive/80 text-xs ml-2 shrink-0"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {!disabled && (
          <label className="inline-block cursor-pointer">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              asChild
            >
              <span>
                {uploading ? "Uploading..." : "+ Add Text Document"}
              </span>
            </Button>
            <input
              type="file"
              accept=".txt,.md,.pdf"
              multiple
              onChange={handleDocumentUpload}
              disabled={disabled || uploading}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Context usage info */}
      {(refImages.length > 0 || textDocs.length > 0) && (
        <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800">
          <strong>Context usage:</strong>
          <ul className="mt-1 ml-4 list-disc space-y-0.5">
            <li>
              Nano Banana Pro: All {refImages.length} reference images +{" "}
              {textDocs.length} documents
            </li>
            <li>Flux Pro: Text descriptions from images + documents</li>
            <li>DALL-E 3: Text descriptions only</li>
          </ul>
        </div>
      )}
    </div>
  );
}
