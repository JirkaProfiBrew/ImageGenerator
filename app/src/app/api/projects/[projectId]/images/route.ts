import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { persistImageToStorage } from "@/lib/supabase/storage";
import type { Database } from "@/lib/supabase/database.types";

type GeneratedImageRow = Database["public"]["Tables"]["generated_images"]["Row"];

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

// POST /api/projects/:projectId/images - Save a sample image to the project
export async function POST(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;
    console.log("[Images API] POST save image for project:", projectId);

    // Verify project ownership
    const { data: project, error: projectError } = await supabaseAdmin
      .from("projects")
      .select("id")
      .eq("id", projectId)
      .eq("user_id", MOCK_USER_ID)
      .single() as { data: { id: string } | null; error: { message: string } | null };

    if (projectError || !project) {
      console.error("[Images API] Project not found:", projectId, projectError?.message);
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const {
      sample_id,
      image_url,
      ai_service,
      prompt_used,
      scene_description,
      generation_time,
      credit_cost,
      parameters,
    } = body;

    console.log("[Images API] Saving:", { sample_id, ai_service, image_url_length: image_url?.length });

    if (!image_url || !ai_service) {
      return NextResponse.json(
        { success: false, error: "image_url and ai_service are required" },
        { status: 400 }
      );
    }

    // Check if already saved (prevent duplicates)
    if (sample_id) {
      const { data: existing, error: dupError } = await supabaseAdmin
        .from("generated_images")
        .select("id")
        .eq("project_id", projectId)
        .eq("sample_id", sample_id)
        .eq("ai_service_id", ai_service)
        .maybeSingle() as { data: { id: string } | null; error: { message: string } | null };

      if (dupError) {
        console.error("[Images API] Duplicate check error:", dupError.message);
        throw new Error(dupError.message);
      }

      if (existing) {
        return NextResponse.json(
          { success: false, error: "This image is already saved" },
          { status: 409 }
        );
      }
    }

    // Persist image to Supabase Storage (permanent URL)
    const permanentUrl = await persistImageToStorage(image_url, projectId, ai_service);
    const finalImageUrl = permanentUrl ?? image_url; // fallback to original if upload fails

    if (!permanentUrl) {
      console.warn("[Images API] Storage upload failed, using original (temporary) URL");
    }

    const { data: savedImage, error: insertError } = await supabaseAdmin
      .from("generated_images")
      .insert({
        project_id: projectId,
        sample_id: sample_id || null,
        image_url: finalImageUrl,
        ai_service_id: ai_service,
        prompt_used: prompt_used || "",
        scene_description: scene_description || null,
        generation_time: generation_time || null,
        credit_cost: credit_cost || 0,
        parameters: parameters || {},
        image_type: "sample" as const,
      })
      .select()
      .single() as { data: GeneratedImageRow | null; error: { message: string } | null };

    if (insertError) {
      console.error("[Images API] Insert error:", insertError.message);
      throw new Error(insertError.message);
    }

    console.log("[Images API] Saved successfully:", savedImage?.id);

    return NextResponse.json(
      { success: true, image: savedImage },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Images API] POST error:", message);
    // Check for missing table error - provide user-friendly message
    if (message.includes("schema cache") || message.includes("generated_images")) {
      return NextResponse.json(
        { success: false, error: "Image saving not available yet. Please run the generated_images migration." },
        { status: 503 }
      );
    }
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// GET /api/projects/:projectId/images - Get all saved images for a project
export async function GET(
  _request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    // Verify project ownership
    const { data: project, error: projectError } = await supabaseAdmin
      .from("projects")
      .select("id")
      .eq("id", projectId)
      .eq("user_id", MOCK_USER_ID)
      .single() as { data: { id: string } | null; error: { message: string } | null };

    if (projectError || !project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const { data: images, error } = await supabaseAdmin
      .from("generated_images")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false }) as {
      data: GeneratedImageRow[] | null;
      error: { message: string } | null;
    };

    // Return empty array if table doesn't exist yet (migration not run)
    if (error) {
      console.error("[Images API] Query error:", error.message);
      return NextResponse.json({ success: true, images: [] });
    }

    return NextResponse.json({
      success: true,
      images: images ?? [],
    });
  } catch (error) {
    // Graceful degradation - return empty array on any error
    console.error("[Images API] Error:", error);
    return NextResponse.json({ success: true, images: [] });
  }
}
