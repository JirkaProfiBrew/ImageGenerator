import { z } from "zod";

// ============================================================================
// Validation Schemas - ImageGen AI
// ============================================================================

// --- File Upload ---
export const imageFileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((f) => f.size <= 10 * 1024 * 1024, "File must be under 10MB")
    .refine(
      (f) =>
        ["image/png", "image/jpeg", "image/webp"].includes(f.type),
      "Only PNG, JPG, and WebP files are accepted"
    ),
});

export const csvFileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((f) => f.size <= 50 * 1024 * 1024, "File must be under 50MB")
    .refine(
      (f) => f.name.endsWith(".csv"),
      "Only CSV files are accepted"
    ),
});

// --- Enhancement Mode Parameters ---
export const enhancementParamsSchema = z.object({
  operation: z.enum([
    "background-replacement",
    "enhancement-basic",
    "enhancement-premium",
  ]),
  background: z.string().min(1, "Background description is required"),
  ratio: z.enum(["1:1", "4:3", "16:9", "9:16", "original"]),
});

// --- Generation Mode Parameters ---
export const generationParamsSchema = z.object({
  prompt: z
    .string()
    .min(10, "Prompt must be at least 10 characters")
    .max(2000, "Prompt must be under 2000 characters"),
  style: z.enum(["realistic", "artistic", "minimalist", "commercial"]),
  backgroundType: z.enum(["white", "gradient", "custom", "transparent"]),
  ratio: z.enum(["1:1", "4:3", "16:9", "9:16", "original"]),
});

// --- Bulk Upload ---
export const bulkUploadSchema = z.object({
  aiService: z.enum(["openai_dalle3", "replicate_flux", "google_nano_banana"]),
  confirmed: z.literal(true, {
    message: "You must confirm before starting",
  }),
});

// --- Inferred Types ---
export type EnhancementParams = z.infer<typeof enhancementParamsSchema>;
export type GenerationParams = z.infer<typeof generationParamsSchema>;
export type BulkUploadParams = z.infer<typeof bulkUploadSchema>;
