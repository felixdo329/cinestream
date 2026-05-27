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
      movies: {
        Row: {
          id: number;
          title: string;
          description: string;
          year: number;
          rating: string;
          imdb: number;
          duration: string;
          genre: string[];
          thumbnail: string;
          backdrop: string;
          video_url: string;
          is_trending: boolean;
          is_featured: boolean;
          is_new: boolean;
          cast_members: string[];
          director: string;
          language: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          description: string;
          year: number;
          rating: string;
          imdb: number;
          duration: string;
          genre?: string[];
          thumbnail: string;
          backdrop: string;
          video_url: string;
          is_trending?: boolean;
          is_featured?: boolean;
          is_new?: boolean;
          cast_members?: string[];
          director: string;
          language?: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string;
          year?: number;
          rating?: string;
          imdb?: number;
          duration?: string;
          genre?: string[];
          thumbnail?: string;
          backdrop?: string;
          video_url?: string;
          is_trending?: boolean;
          is_featured?: boolean;
          is_new?: boolean;
          cast_members?: string[];
          director?: string;
          language?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      watchlist: {
        Row: {
          id: number;
          user_id: string;
          movie_id: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          movie_id: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          movie_id?: number;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
