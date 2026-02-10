import { supabaseAdmin } from "../supabase/server";
import type { Database } from "../supabase/database.types";

type JobRow = Database["public"]["Tables"]["jobs"]["Row"];
type JobInsert = Database["public"]["Tables"]["jobs"]["Insert"];

export async function getJobById(id: string): Promise<JobRow | null> {
  const { data } = await supabaseAdmin
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  return (data as JobRow) ?? null;
}

export async function getProjectJobs(
  projectId: string
): Promise<JobRow[]> {
  const { data } = await supabaseAdmin
    .from("jobs")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })
    .returns<JobRow[]>();

  return data ?? [];
}

export async function createJob(data: JobInsert): Promise<JobRow> {
  const { data: created, error } = await supabaseAdmin
    .from("jobs")
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create job: ${error.message}`);
  }

  return created as JobRow;
}

export async function updateJobProgress(
  id: string,
  progress: number
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("jobs")
    .update({
      progress,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update job progress: ${error.message}`);
  }
}

export async function updateJobStatus(
  id: string,
  status: JobRow["status"],
  errorMessage?: string
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("jobs")
    .update({
      status,
      ...(errorMessage !== undefined && { error_message: errorMessage }),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update job status: ${error.message}`);
  }
}

export async function cancelJob(
  id: string,
  creditsToRefund: number
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("jobs")
    .update({
      status: "cancelled" as JobRow["status"],
      credits_refunded: creditsToRefund,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to cancel job: ${error.message}`);
  }
}
