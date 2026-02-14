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
      ai_services: {
        Row: {
          id: string;
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
          available_params: Json | null;
          default_params: Json | null;
          sort_order: number;
          display_name: string | null;
          description: string | null;
          icon_emoji: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          provider: string;
          status?: "active" | "beta" | "deprecated" | "disabled";
          is_available?: boolean;
          base_cost_credits: number;
          supports_reference_images?: boolean;
          max_reference_images?: number;
          supports_text_context?: boolean;
          supports_seed?: boolean;
          supports_custom_params?: boolean;
          available_params?: Json | null;
          default_params?: Json | null;
          sort_order?: number;
          display_name?: string | null;
          description?: string | null;
          icon_emoji?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          provider?: string;
          status?: "active" | "beta" | "deprecated" | "disabled";
          is_available?: boolean;
          base_cost_credits?: number;
          supports_reference_images?: boolean;
          max_reference_images?: number;
          supports_text_context?: boolean;
          supports_seed?: boolean;
          supports_custom_params?: boolean;
          available_params?: Json | null;
          default_params?: Json | null;
          sort_order?: number;
          display_name?: string | null;
          description?: string | null;
          icon_emoji?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
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
          ai_service_id: string | null;
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
          quality_level: "standard" | "high" | "ultra";
          creativity_level: "low" | "medium" | "high";
          consistency_seed: number | null;
          context_config: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          mode: "enhancement" | "generation";
          ai_service_id?: string | null;
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
          quality_level?: "standard" | "high" | "ultra";
          creativity_level?: "low" | "medium" | "high";
          consistency_seed?: number | null;
          context_config?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          mode?: "enhancement" | "generation";
          ai_service_id?: string | null;
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
          quality_level?: "standard" | "high" | "ultra";
          creativity_level?: "low" | "medium" | "high";
          consistency_seed?: number | null;
          context_config?: Json;
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
          locked_ai_service_id: string | null;
          is_locked: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          scene_description: string;
          generated_images?: Json;
          locked_ai_service_id?: string | null;
          is_locked?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          scene_description?: string;
          generated_images?: Json;
          locked_ai_service_id?: string | null;
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
          ai_service_id: string;
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
          ai_service_id: string;
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
          ai_service_id?: string;
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
      service_costs: {
        Row: {
          id: string;
          service_id: string;
          ai_service_id: string | null;
          cost_usd: number;
          valid_from: string;
          valid_to: string | null;
          source: "api_auto" | "manual" | "calculated";
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          service_id: string;
          ai_service_id?: string | null;
          cost_usd: number;
          valid_from?: string;
          valid_to?: string | null;
          source?: "api_auto" | "manual" | "calculated";
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          service_id?: string;
          ai_service_id?: string | null;
          cost_usd?: number;
          valid_from?: string;
          valid_to?: string | null;
          source?: "api_auto" | "manual" | "calculated";
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      pricing_coefficients: {
        Row: {
          id: string;
          coefficient: number;
          valid_from: string;
          valid_to: string | null;
          name: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          coefficient: number;
          valid_from?: string;
          valid_to?: string | null;
          name: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          coefficient?: number;
          valid_from?: string;
          valid_to?: string | null;
          name?: string;
          description?: string | null;
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
      generated_images: {
        Row: {
          id: string;
          project_id: string;
          sample_id: string | null;
          job_id: string | null;
          image_url: string;
          ai_service_id: string;
          prompt_used: string;
          scene_description: string | null;
          generation_time: number | null;
          credit_cost: number;
          parameters: Json;
          image_type: "sample" | "bulk";
          is_favorite: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          sample_id?: string | null;
          job_id?: string | null;
          image_url: string;
          ai_service_id: string;
          prompt_used?: string;
          scene_description?: string | null;
          generation_time?: number | null;
          credit_cost?: number;
          parameters?: Json;
          image_type?: "sample" | "bulk";
          is_favorite?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          sample_id?: string | null;
          job_id?: string | null;
          image_url?: string;
          ai_service_id?: string;
          prompt_used?: string;
          scene_description?: string | null;
          generation_time?: number | null;
          credit_cost?: number;
          parameters?: Json;
          image_type?: "sample" | "bulk";
          is_favorite?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      project_service_configs: {
        Row: {
          id: string;
          project_id: string;
          ai_service_id: string;
          use_basic_params: boolean;
          custom_params: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          ai_service_id: string;
          use_basic_params?: boolean;
          custom_params?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          ai_service_id?: string;
          use_basic_params?: boolean;
          custom_params?: Json | null;
          created_at?: string;
          updated_at?: string;
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
      user_service_preferences: {
        Row: {
          id: string;
          user_id: string;
          ai_service_id: string;
          is_enabled: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          ai_service_id: string;
          is_enabled?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          ai_service_id?: string;
          is_enabled?: boolean;
          sort_order?: number;
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
