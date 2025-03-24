export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      course_holes: {
        Row: {
          blue_tee_handicap: number
          course_id: number | null
          hole_number: number
          id: number
          par: number
          red_tee_handicap: number
        }
        Insert: {
          blue_tee_handicap: number
          course_id?: number | null
          hole_number: number
          id?: number
          par: number
          red_tee_handicap: number
        }
        Update: {
          blue_tee_handicap?: number
          course_id?: number | null
          hole_number?: number
          id?: number
          par?: number
          red_tee_handicap?: number
        }
        Relationships: []
      }
      course_holesbak: {
        Row: {
          blue_tee_handicap: number
          course_id: number | null
          hole_number: number
          id: number
          par: number
          red_tee_handicap: number
        }
        Insert: {
          blue_tee_handicap: number
          course_id?: number | null
          hole_number: number
          id?: number
          par: number
          red_tee_handicap: number
        }
        Update: {
          blue_tee_handicap?: number
          course_id?: number | null
          hole_number?: number
          id?: number
          par?: number
          red_tee_handicap?: number
        }
        Relationships: []
      }
      courses: {
        Row: {
          course_rating: number
          id: number
          name: string
          slope_rating: number
          tee_color: string
        }
        Insert: {
          course_rating: number
          id?: number
          name: string
          slope_rating: number
          tee_color: string
        }
        Update: {
          course_rating?: number
          id?: number
          name?: string
          slope_rating?: number
          tee_color?: string
        }
        Relationships: []
      }
      games: {
        Row: {
          date: string
          game_type: string
          id: number
          results: Json | null
          team_ids: number[]
        }
        Insert: {
          date: string
          game_type: string
          id?: number
          results?: Json | null
          team_ids: number[]
        }
        Update: {
          date?: string
          game_type?: string
          id?: number
          results?: Json | null
          team_ids?: number[]
        }
        Relationships: []
      }
      hole_scores: {
        Row: {
          hole_id: number | null
          id: number
          score_id: number | null
          strokes: number
        }
        Insert: {
          hole_id?: number | null
          id?: number
          score_id?: number | null
          strokes: number
        }
        Update: {
          hole_id?: number | null
          id?: number
          score_id?: number | null
          strokes?: number
        }
        Relationships: [
          {
            foreignKeyName: "hole_scores_hole_id_fkey"
            columns: ["hole_id"]
            isOneToOne: false
            referencedRelation: "course_holes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hole_scores_score_id_fkey"
            columns: ["score_id"]
            isOneToOne: false
            referencedRelation: "scores"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          role: string | null
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string | null
        }
        Relationships: []
      }
      scores: {
        Row: {
          course_handicap: number | null
          course_id: number | null
          game_id: number | null
          gross_score: number | null
          id: number
          in_score: number | null
          net_score: number | null
          out_score: number | null
          player_id: number | null
        }
        Insert: {
          course_handicap?: number | null
          course_id?: number | null
          game_id?: number | null
          gross_score?: number | null
          id?: number
          in_score?: number | null
          net_score?: number | null
          out_score?: number | null
          player_id?: number | null
        }
        Update: {
          course_handicap?: number | null
          course_id?: number | null
          game_id?: number | null
          gross_score?: number | null
          id?: number
          in_score?: number | null
          net_score?: number | null
          out_score?: number | null
          player_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "scores_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scores_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scores_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          id: number
          player_ids: number[]
          team_name: string
        }
        Insert: {
          id?: number
          player_ids: number[]
          team_name: string
        }
        Update: {
          id?: number
          player_ids?: number[]
          team_name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          handicap_index: number | null
          id: number
          name: string
        }
        Insert: {
          email?: string | null
          handicap_index?: number | null
          id?: number
          name: string
        }
        Update: {
          email?: string | null
          handicap_index?: number | null
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_course_handicap: {
        Args: {
          handicap_index: number
          slope_rating: number
        }
        Returns: number
      }
      calculate_handicap_index: {
        Args: {
          adjusted_gross_score: number
          course_rating: number
          slope_rating: number
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
