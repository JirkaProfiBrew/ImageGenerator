import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_TEXT_EXTENSIONS = [".txt", ".md", ".pdf"];

type UploadType = "reference_image" | "text_document";

function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  if (lastDot === -1) return "";
  return filename.slice(lastDot).toLowerCase();
}

function isValidFileType(file: File, type: UploadType): boolean {
  if (type === "reference_image") {
    return file.type.startsWith("image/");
  }

  if (type === "text_document") {
    const ext = getFileExtension(file.name);
    return ALLOWED_TEXT_EXTENSIONS.includes(ext);
  }

  return false;
}

function getBucket(type: UploadType): string {
  return type === "reference_image" ? "reference-images" : "text-documents";
}

export async function POST(request: NextRequest) {
  try {
    console.log("[upload] Received upload request");

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string | null;

    // Validate presence of required fields
    if (!file) {
      console.log("[upload] No file provided");
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!type) {
      console.log("[upload] No type provided");
      return NextResponse.json(
        { error: "No type provided. Must be 'reference_image' or 'text_document'" },
        { status: 400 }
      );
    }

    // Validate type value
    if (type !== "reference_image" && type !== "text_document") {
      console.log(`[upload] Invalid type: ${type}`);
      return NextResponse.json(
        { error: "Invalid type. Must be 'reference_image' or 'text_document'" },
        { status: 400 }
      );
    }

    console.log(`[upload] File: ${file.name}, Size: ${file.size}, MIME: ${file.type}, Type: ${type}`);

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      console.log(`[upload] File too large: ${file.size} bytes (max ${MAX_FILE_SIZE})`);
      return NextResponse.json(
        { error: `File too large. Maximum size is 10MB, got ${(file.size / 1024 / 1024).toFixed(2)}MB` },
        { status: 400 }
      );
    }

    // Validate file type
    if (!isValidFileType(file, type)) {
      const expected =
        type === "reference_image"
          ? "an image file (image/*)"
          : "a text file (.txt, .md, or .pdf)";
      console.log(`[upload] Invalid file type: ${file.type} for upload type ${type}`);
      return NextResponse.json(
        { error: `Invalid file type. Expected ${expected}, got '${file.type || getFileExtension(file.name)}'` },
        { status: 400 }
      );
    }

    // Determine bucket and file path
    const bucket = getBucket(type);
    const filePath = `${MOCK_USER_ID}/${Date.now()}-${file.name}`;

    console.log(`[upload] Uploading to bucket '${bucket}', path '${filePath}'`);

    // Read file into buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("[upload] Supabase upload error:", error);
      return NextResponse.json(
        { error: `Upload failed: ${error.message}` },
        { status: 500 }
      );
    }

    console.log("[upload] Upload successful:", data);

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath);

    console.log("[upload] Public URL:", urlData.publicUrl);

    return NextResponse.json({
      url: urlData.publicUrl,
      filename: file.name,
    });
  } catch (error) {
    console.error("[upload] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
