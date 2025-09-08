// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          nickname: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          nickname?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          nickname?: string | null;
          updated_at?: string;
        };
      };
      news: {
        Row: {
          id: string;
          title: string;
          content: string | null;
          summary: string | null;
          sentiment: 'positive' | 'negative' | 'neutral' | null;
          keywords: string[] | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
          source_url: string | null;
          source_name: string | null;
          author: string | null;
          category: string | null;
          image_url: string | null;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          title: string;
          content?: string | null;
          summary?: string | null;
          sentiment?: 'positive' | 'negative' | 'neutral' | null;
          keywords?: string[] | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
          source_url?: string | null;
          source_name?: string | null;
          author?: string | null;
          category?: string | null;
          image_url?: string | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string | null;
          summary?: string | null;
          sentiment?: 'positive' | 'negative' | 'neutral' | null;
          keywords?: string[] | null;
          published_at?: string | null;
          updated_at?: string;
          source_url?: string | null;
          source_name?: string | null;
          author?: string | null;
          category?: string | null;
          image_url?: string | null;
          is_active?: boolean;
        };
      };
      user_keywords: {
        Row: {
          id: string;
          user_id: string;
          keyword: string;
          weight: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          keyword: string;
          weight?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          keyword?: string;
          weight?: number;
          updated_at?: string;
        };
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          news_id: string;
          created_at: string;
          notes: string | null;
          tags: string[] | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          news_id: string;
          created_at?: string;
          notes?: string | null;
          tags?: string[] | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          news_id?: string;
          notes?: string | null;
          tags?: string[] | null;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}