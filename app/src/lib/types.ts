// ============================================================================
// Domain Types - ImageGen AI
// ============================================================================

// --- AI Services ---
export type AIService = "openai_dalle3" | "replicate_flux" | "google_nano_banana";

/** Alias for the string FK to ai_services.id */
export type AIServiceId = string;

export type AIServiceLabel = "DALL-E 3" | "Flux Pro" | "Nano Banana Pro";

export const AI_SERVICE_LABELS: Record<AIService, AIServiceLabel> = {
  openai_dalle3: "DALL-E 3",
  replicate_flux: "Flux Pro",
  google_nano_banana: "Nano Banana Pro",
};

/** Full AI service entity from ai_services table */
export interface AIServiceData {
  id: AIService;
  name: string;
  provider: string;
  status: "active" | "beta" | "deprecated" | "disabled";
  is_available: boolean;
  base_cost_credits: number;
  supports_reference_images: boolean;
  max_reference_images: number;
  supports_text_context: boolean;
  supports_seed: boolean;
  supports_custom_params: boolean;
  available_params: Record<string, unknown> | null;
  default_params: Record<string, unknown> | null;
  sort_order: number;
  display_name: string | null;
  description: string | null;
  icon_emoji: string | null;
}

// --- Mode ---
export type Mode = "enhancement" | "generation";

// --- User ---
export interface User {
  id: string;
  email: string;
  creditBalance: number;
  createdAt: Date;
}

// --- Project ---
export type ProjectStatus =
  | "draft"
  | "queued"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

export interface ProjectSettings {
  backgroundStyle?: string;
  enhancementLevel?: string;
  style?: string;
  ratio?: string;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  mode: Mode;
  aiService: AIService;
  totalImages: number;
  totalCreditsSpent: number;
  status: ProjectStatus;
  settings: ProjectSettings;
  createdAt: Date;
}

// --- Image ---
export type ImageStatus = "pending" | "processing" | "completed" | "failed";

export interface GeneratedImage {
  id: string;
  projectId: string;
  productName: string;
  sourceImageUrl?: string;
  generatedImageUrl: string;
  aiService: AIService;
  mode: Mode;
  creditsSpent: number;
  status: ImageStatus;
  createdAt: Date;
}

// --- Credits ---
export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  perCredit: string;
  discountPercent: number;
  isPopular?: boolean;
}

export type TransactionType = "purchase" | "usage" | "refund" | "bonus";

export interface CreditTransaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  balanceAfter: number;
  createdAt: Date;
}

// --- AI Test Result ---
export type QualityRating = "Excellent" | "Very Good" | "Good";

export interface AITestResult {
  aiService: AIService;
  displayName: string;
  imageUrl: string;
  creditCost: number;
  quality: QualityRating;
  speed: string;
  generationTime?: number;
  recommended?: boolean;
  tagline?: string;
  isBestValue?: boolean;
}

// --- Bulk Upload ---
export interface CSVRow {
  product_name: string;
  description: string;
  background: string;
  [key: string]: string;
}

export interface CostEstimate {
  totalImages: number;
  creditsPerImage: number;
  totalCredits: number;
  dollarAmount: number;
  estimatedTime: string;
  currentBalance: number;
  balanceAfter: number;
}

// --- Job Progress ---
export interface JobProgress {
  jobId: string;
  projectName: string;
  totalImages: number;
  completedImages: number;
  failedImages: number;
  aiService: AIService;
  speedPerImage: string;
  estimatedTimeRemaining: string;
  status: "processing" | "paused" | "completed" | "cancelled";
}

// --- Enhancement Options ---
export type EnhancementOperation =
  | "background-replacement"
  | "enhancement-basic"
  | "enhancement-premium";

export type AspectRatio = "1:1" | "5:4" | "16:9" | "9:16" | "original";

export type ImageStyle =
  | "realistic"
  | "artistic"
  | "minimalist"
  | "commercial";

export type BackgroundType =
  | "white"
  | "gradient"
  | "custom"
  | "transparent";

// --- Sample & Style Project (Phase 7.5) ---
export interface GeneratedImageData {
  aiService: AIService;
  imageUrl: string;
  creditCost: number;
  generationTime: number;
  quality: string;
  error?: string;
}

export interface Sample {
  id: string;
  projectId: string;
  sceneDescription: string;
  generatedImages: GeneratedImageData[];
  lockedAiServiceId?: AIServiceId;
  isLocked: boolean;
  createdAt: string;
}

export interface CreateProjectInput {
  name: string;
  basePrompt: string;
  aiService: AIService;
  defaultRatio: AspectRatio;
}

export interface SelectedServices {
  dalle3: boolean;
  flux: boolean;
  nanoBanana: boolean;
}

// --- Context & Fine-tuning (Phase 7.7) ---

export interface ReferenceImage {
  id: string;
  url: string;
  filename: string;
  uploaded_at: string;
}

export interface TextDocument {
  id: string;
  url: string;
  filename: string;
  uploaded_at: string;
}

export interface ProjectContext {
  reference_images?: ReferenceImage[];
  text_documents?: TextDocument[];
}

// Service-specific custom parameter types
export interface FluxCustomParams {
  guidance?: number; // 2.0-5.0
  num_inference_steps?: number; // 1-50
  interval?: number; // 1.0-4.0
  prompt_upsampling?: boolean;
  safety_tolerance?: number; // 1-6
}

export interface NanoBananaCustomParams {
  imageSize?: "1K" | "2K" | "4K";
  thinkingLevel?: "low" | "high";
}

export interface DallECustomParams {
  quality?: "standard" | "hd";
  style?: "natural" | "vivid";
}

export type ServiceCustomParams =
  | FluxCustomParams
  | NanoBananaCustomParams
  | DallECustomParams;

export interface ProjectServiceConfig {
  id: string;
  project_id: string;
  ai_service_id: AIServiceId;
  use_basic_params: boolean;
  custom_params?: ServiceCustomParams;
  created_at: string;
  updated_at: string;
}
