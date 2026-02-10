// ============================================================================
// Domain Types - ImageGen AI
// ============================================================================

// --- AI Services ---
export type AIService = "openai_dalle3" | "replicate_flux" | "google_nano_banana";

export type AIServiceLabel = "DALL-E 3" | "Flux Pro" | "Nano Banana Pro";

export const AI_SERVICE_LABELS: Record<AIService, AIServiceLabel> = {
  openai_dalle3: "DALL-E 3",
  replicate_flux: "Flux Pro",
  google_nano_banana: "Nano Banana Pro",
};

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

export type AspectRatio = "1:1" | "4:3" | "16:9" | "9:16" | "original";

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
