import { supabaseAdmin } from "./server";

const GENERATED_IMAGES_BUCKET = "generated-images";

/**
 * Download an image from an external URL and upload it to Supabase Storage.
 * Returns the permanent public URL, or null if the operation fails.
 */
export async function persistImageToStorage(
  externalUrl: string,
  projectId: string,
  serviceId: string
): Promise<string | null> {
  try {
    // Download image from the temporary external URL
    const response = await fetch(externalUrl);

    if (!response.ok) {
      console.error(
        `[Storage] Failed to download image: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Detect content type and extension
    const contentType = response.headers.get("content-type") || "image/png";
    const ext = contentType.includes("jpeg") || contentType.includes("jpg")
      ? "jpg"
      : contentType.includes("webp")
        ? "webp"
        : "png";

    // Upload to Supabase Storage
    const filePath = `${projectId}/${Date.now()}-${serviceId}.${ext}`;

    const { error } = await supabaseAdmin.storage
      .from(GENERATED_IMAGES_BUCKET)
      .upload(filePath, buffer, {
        contentType,
        upsert: false,
      });

    if (error) {
      console.error("[Storage] Upload error:", error.message);
      return null;
    }

    // Get permanent public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(GENERATED_IMAGES_BUCKET)
      .getPublicUrl(filePath);

    console.log("[Storage] Persisted image:", urlData.publicUrl.substring(0, 80) + "...");
    return urlData.publicUrl;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Storage] persistImageToStorage failed:", message);
    return null;
  }
}
