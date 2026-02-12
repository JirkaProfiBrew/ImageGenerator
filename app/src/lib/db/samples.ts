import { supabaseAdmin } from "../supabase/server";
import type { Database } from "../supabase/database.types";

type SampleRow = Database["public"]["Tables"]["samples"]["Row"];
type SampleInsert = Database["public"]["Tables"]["samples"]["Insert"];

export async function getSampleById(
  id: string
): Promise<SampleRow | null> {
  const { data } = await supabaseAdmin
    .from("samples")
    .select("*")
    .eq("id", id)
    .single();

  return (data as SampleRow) ?? null;
}

export async function getProjectSamples(
  projectId: string
): Promise<SampleRow[]> {
  const { data } = await supabaseAdmin
    .from("samples")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })
    .returns<SampleRow[]>();

  return data ?? [];
}

export async function createSample(
  data: SampleInsert
): Promise<SampleRow> {
  const { data: created, error } = await supabaseAdmin
    .from("samples")
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create sample: ${error.message}`);
  }

  return created as SampleRow;
}

export async function lockSample(
  sampleId: string,
  selectedService: string
): Promise<SampleRow> {
  const { data: updated, error } = await supabaseAdmin
    .from("samples")
    .update({ is_locked: true, selected_service: selectedService })
    .eq("id", sampleId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to lock sample: ${error.message}`);
  }

  return updated as SampleRow;
}

export async function getLockedSample(
  projectId: string
): Promise<SampleRow | null> {
  const { data } = await supabaseAdmin
    .from("samples")
    .select("*")
    .eq("project_id", projectId)
    .eq("is_locked", true)
    .single();

  return (data as SampleRow) ?? null;
}
