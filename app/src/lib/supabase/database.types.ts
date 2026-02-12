export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          password_hash: string | null;
          plan: "free" | "starter" | "pro" | "business";
          credit_balance: number;
          stripe_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash?: string | null;
          plan?: "free" | "starter" | "pro" | "business";
          credit_balance?: number;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string | null;
          plan?: "free" | "starter" | "pro" | "business";
          credit_balance?: number;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          mode: "enhancement" | "generation";
          ai_service: "openai_dalle3" | "replicate_flux" | "google_nano_banana" | null;
          total_images: number;
          total_credits_spent: number;
          status:
            | "draft"
            | "queued"
            | "processing"
            | "completed"
            | "failed"
            | "cancelled";
          settings: Json;
          base_prompt: string | null;
          default_ratio: string;
          locked_sample_id: string | null;
          style: string;
          background: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          mode: "enhancement" | "generation";
          ai_service?: "openai_dalle3" | "replicate_flux" | "google_nano_banana" | null;
          total_images?: number;
          total_credits_spent?: number;
          status?:
            | "draft"
            | "queued"
            | "processing"
            | "completed"
            | "failed"
            | "cancelled";
          settings?: Json;
          base_prompt?: string | null;
          default_ratio?: string;
          locked_sample_id?: string | null;
          style?: string;
          background?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          mode?: "enhancement" | "generation";
          ai_service?: "openai_dalle3" | "replicate_flux" | "google_nano_banana" | null;
          total_images?: number;
          total_credits_spent?: number;
          status?:
            | "draft"
            | "queued"
            | "processing"
            | "completed"
            | "failed"
            | "cancelled";
          settings?: Json;
          base_prompt?: string | null;
          default_ratio?: string;
          locked_sample_id?: string | null;
          style?: string;
          background?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      samples: {
        Row: {
          id: string;
          project_id: string;
          scene_description: string;
          generated_images: Json;
          selected_service: string | null;
          is_locked: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          scene_description: string;
          generated_images?: Json;
          selected_service?: string | null;
          is_locked?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          scene_description?: string;
          generated_images?: Json;
          selected_service?: string | null;
          is_locked?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      images: {
        Row: {
          id: string;
          project_id: string;
          product_name: string;
          source_image_url: string | null;
          generated_image_url: string | null;
          ai_service: string;
          mode: "enhancement" | "generation";
          credits_spent: number;
          status: "pending" | "processing" | "completed" | "failed";
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          product_name: string;
          source_image_url?: string | null;
          generated_image_url?: string | null;
          ai_service: string;
          mode: "enhancement" | "generation";
          credits_spent: number;
          status?: "pending" | "processing" | "completed" | "failed";
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          product_name?: string;
          source_image_url?: string | null;
          generated_image_url?: string | null;
          ai_service?: string;
          mode?: "enhancement" | "generation";
          credits_spent?: number;
          status?: "pending" | "processing" | "completed" | "failed";
          created_at?: string;
        };
        Relationships: [];
      };
      credit_transactions: {
        Row: {
          id: string;
          user_id: string;
          type: "purchase" | "usage" | "refund" | "bonus" | "welcome";
          amount: number;
          description: string;
          balance_after: number;
          project_id: string | null;
          stripe_payment_intent_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: "purchase" | "usage" | "refund" | "bonus" | "welcome";
          amount: number;
          description: string;
          balance_after: number;
          project_id?: string | null;
          stripe_payment_intent_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: "purchase" | "usage" | "refund" | "bonus" | "welcome";
          amount?: number;
          description?: string;
          balance_after?: number;
          project_id?: string | null;
          stripe_payment_intent_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      credit_packages: {
        Row: {
          id: string;
          name: string;
          credits: number;
          price_cents: number;
          discount_percent: number;
          is_active: boolean;
          is_popular: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          credits: number;
          price_cents: number;
          discount_percent?: number;
          is_active?: boolean;
          is_popular?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          credits?: number;
          price_cents?: number;
          discount_percent?: number;
          is_active?: boolean;
          is_popular?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      jobs: {
        Row: {
          id: string;
          project_id: string;
          mode: "enhancement" | "generation";
          payload: Json;
          status:
            | "queued"
            | "processing"
            | "completed"
            | "failed"
            | "cancelled";
          progress: number;
          credits_reserved: number;
          credits_refunded: number;
          error_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          mode: "enhancement" | "generation";
          payload: Json;
          status?:
            | "queued"
            | "processing"
            | "completed"
            | "failed"
            | "cancelled";
          progress?: number;
          credits_reserved: number;
          credits_refunded?: number;
          error_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          mode?: "enhancement" | "generation";
          payload?: Json;
          status?:
            | "queued"
            | "processing"
            | "completed"
            | "failed"
            | "cancelled";
          progress?: number;
          credits_reserved?: number;
          credits_refunded?: number;
          error_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
