import type { ProjectContext, ReferenceImage } from "@/lib/types";

/**
 * Extracts text content from a base64 data URL of a text document.
 * Documents are stored as `data:<mime>;base64,<content>` in context_config (MVP).
 */
function decodeTextDocument(dataUrl: string): string | null {
  try {
    const match = dataUrl.match(/^data:[^;]+;base64,(.+)$/);
    if (!match) return null;
    return Buffer.from(match[1], "base64").toString("utf-8");
  } catch {
    return null;
  }
}

/**
 * Load and process project context for use in AI generation.
 * Returns reference images (as-is) and decoded text from documents.
 */
export function loadProjectContext(contextConfig?: ProjectContext): {
  referenceImages: ReferenceImage[];
  documentText: string;
} {
  if (!contextConfig) return { referenceImages: [], documentText: "" };

  const referenceImages = contextConfig.reference_images ?? [];

  // Decode text documents from base64 data URLs
  const textParts: string[] = [];
  for (const doc of contextConfig.text_documents ?? []) {
    const text = decodeTextDocument(doc.url);
    if (text) {
      textParts.push(`[${doc.filename}]\n${text}`);
    }
  }

  return {
    referenceImages,
    documentText: textParts.join("\n\n"),
  };
}

/**
 * Builds a context string to append to prompts for services that
 * don't support image input (DALL-E, Flux).
 * Includes text document content and basic image descriptions.
 */
export function buildContextPromptSuffix(
  documentText: string,
  referenceImageCount: number
): string {
  const parts: string[] = [];

  if (documentText) {
    parts.push("CONTEXT FROM DOCUMENTS:");
    parts.push(documentText);
  }

  if (referenceImageCount > 0) {
    parts.push(
      `VISUAL REFERENCES: ${referenceImageCount} reference image(s) provided for style guidance.`
    );
  }

  if (parts.length === 0) return "";
  return "\n\n" + parts.join("\n\n");
}

/**
 * Extracts inline_data parts from reference images for Gemini API.
 * Reference images are stored as base64 data URLs in context_config.
 * Returns content parts array for the Gemini request body.
 */
export function buildGeminiImageParts(
  referenceImages: ReferenceImage[],
  maxImages = 14
): { inline_data: { mime_type: string; data: string } }[] {
  const parts: { inline_data: { mime_type: string; data: string } }[] = [];

  for (const img of referenceImages.slice(0, maxImages)) {
    const match = img.url.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) continue;

    parts.push({
      inline_data: {
        mime_type: match[1],
        data: match[2],
      },
    });
  }

  return parts;
}
