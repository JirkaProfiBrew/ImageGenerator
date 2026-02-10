import { supabaseAdmin } from "../supabase/server";
import type { Database } from "../supabase/database.types";

type ImageRow = Database["public"]["Tables"]["images"]["Row"];
type ImageInsert = Database["public"]["Tables"]["images"]["Insert"];

export async function getProjectImages(
  projectId: string
): Promise<ImageRow[]> {
  const { data } = await supabaseAdmin
    .from("images")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true })
    .returns<ImageRow[]>();

  return data ?? [];
}

export async function getImageById(id: string): Promise<ImageRow | null> {
  const { data } = await supabaseAdmin
    .from("images")
    .select("*")
    .eq("id", id)
    .single();

  return (data as ImageRow) ?? null;
}

export async function createImage(data: ImageInsert): Promise<ImageRow> {
  const { data: created, error } = await supabaseAdmin
    .from("images")
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create image: ${error.message}`);
  }

  return created as ImageRow;
}

export async function createImages(
  data: ImageInsert[]
): Promise<ImageRow[]> {
  const { data: created, error } = await supabaseAdmin
    .from("images")
    .insert(data)
    .select()
    .returns<ImageRow[]>();

  if (error) {
    throw new Error(`Failed to create images: ${error.message}`);
  }

  return created ?? [];
}

export async function updateImageStatus(
  id: string,
  status: ImageRow["status"],
  generatedImageUrl?: string
): Promise<void> {
  const update: Record<string, unknown> = { status };

  if (generatedImageUrl !== undefined) {
    update.generated_image_url = generatedImageUrl;
  }

  const { error } = await supabaseAdmin
    .from("images")
    .update(update)
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update image status: ${error.message}`);
  }
}
