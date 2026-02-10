import { supabaseAdmin } from "../supabase/server";
import type { Database } from "../supabase/database.types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];

export async function getProjectById(
  id: string
): Promise<ProjectRow | null> {
  const { data } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  return (data as ProjectRow) ?? null;
}

export async function getUserProjects(
  userId: string
): Promise<ProjectRow[]> {
  const { data } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .returns<ProjectRow[]>();

  return data ?? [];
}

export async function createProject(
  data: ProjectInsert
): Promise<ProjectRow> {
  const { data: created, error } = await supabaseAdmin
    .from("projects")
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }

  return created as ProjectRow;
}

export async function updateProject(
  id: string,
  data: ProjectUpdate
): Promise<ProjectRow> {
  const { data: updated, error } = await supabaseAdmin
    .from("projects")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update project: ${error.message}`);
  }

  return updated as ProjectRow;
}

export async function updateProjectStatus(
  id: string,
  status: ProjectRow["status"]
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("projects")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update project status: ${error.message}`);
  }
}
