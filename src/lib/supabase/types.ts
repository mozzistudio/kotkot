export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      brokers: {
        Row: {
          id: string;
          auth_user_id: string | null;
          email: string;
          name: string;
          company_name: string | null;
          phone: string | null;
          country_code: string;
          currency: string;
          plan: 'starter' | 'pro' | 'enterprise';
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          stripe_connect_account_id: string | null;
          yappy_merchant_id: string | null;
          yappy_secret_token: string | null;
          payment_method: 'yappy' | 'stripe';
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['brokers']['Row']> & { email: string; name: string };
        Update: Partial<Database['public']['Tables']['brokers']['Row']>;
      };
      conversations: {
        Row: {
          id: string;
          broker_id: string;
          whatsapp_number_id: string | null;
          client_phone: string;
          client_name: string | null;
          status: 'active' | 'waiting_payment' | 'human_takeover' | 'closed';
          insurance_type: string | null;
          tags: string[];
          ai_summary: string | null;
          started_at: string;
          last_message_at: string;
          closed_at: string | null;
        };
        Insert: Partial<Database['public']['Tables']['conversations']['Row']> & { broker_id: string; client_phone: string };
        Update: Partial<Database['public']['Tables']['conversations']['Row']>;
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          role: 'user' | 'bot' | 'human' | 'system';
          content: string;
          message_type: 'text' | 'image' | 'document' | 'button' | 'list' | 'payment_link';
          wa_message_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['messages']['Row']> & { conversation_id: string; role: string; content: string };
        Update: Partial<Database['public']['Tables']['messages']['Row']>;
      };
      insurers: {
        Row: {
          id: string;
          name: string;
          slug: string;
          country_code: string;
          logo_url: string | null;
          api_adapter_type: string;
          supported_products: string[];
          market_share: number | null;
          is_active: boolean;
        };
        Insert: Partial<Database['public']['Tables']['insurers']['Row']> & { name: string; slug: string; country_code: string; api_adapter_type: string };
        Update: Partial<Database['public']['Tables']['insurers']['Row']>;
      };
      countries: {
        Row: {
          code: string;
          name: string;
          currency: string;
          currency_symbol: string;
          payment_methods: string[];
          flag_emoji: string | null;
          insurance_regulator: string | null;
          is_active: boolean;
        };
        Insert: Partial<Database['public']['Tables']['countries']['Row']> & { code: string; name: string; currency: string; currency_symbol: string; payment_methods: string[] };
        Update: Partial<Database['public']['Tables']['countries']['Row']>;
      };
    };
  };
}
