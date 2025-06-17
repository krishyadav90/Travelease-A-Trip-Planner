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
      answers: {
        Row: {
          content: string
          created_at: string | null
          helpful_count: number | null
          id: string
          is_helpful: boolean | null
          question_id: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          is_helpful?: boolean | null
          question_id?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          is_helpful?: boolean | null
          question_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      attractions: {
        Row: {
          best_time_to_visit: string | null
          category: Database["public"]["Enums"]["interest_category"]
          created_at: string | null
          description: string | null
          destination_id: string | null
          entry_fee: string | null
          id: string
          image_url: string | null
          latitude: number | null
          longitude: number | null
          name: string
          opening_hours: Json | null
          rating: number | null
          review_count: number | null
          updated_at: string | null
        }
        Insert: {
          best_time_to_visit?: string | null
          category: Database["public"]["Enums"]["interest_category"]
          created_at?: string | null
          description?: string | null
          destination_id?: string | null
          entry_fee?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          name: string
          opening_hours?: Json | null
          rating?: number | null
          review_count?: number | null
          updated_at?: string | null
        }
        Update: {
          best_time_to_visit?: string | null
          category?: Database["public"]["Enums"]["interest_category"]
          created_at?: string | null
          description?: string | null
          destination_id?: string | null
          entry_fee?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          opening_hours?: Json | null
          rating?: number | null
          review_count?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attractions_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_data: Json
          booking_date: string
          booking_reference: string
          booking_type: string
          created_at: string
          id: string
          status: string
          total_amount: number
          travel_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_data: Json
          booking_date?: string
          booking_reference: string
          booking_type: string
          created_at?: string
          id?: string
          status?: string
          total_amount: number
          travel_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_data?: Json
          booking_date?: string
          booking_reference?: string
          booking_type?: string
          created_at?: string
          id?: string
          status?: string
          total_amount?: number
          travel_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      destinations: {
        Row: {
          average_cost: number | null
          best_seasons: Database["public"]["Enums"]["season_type"][] | null
          category: string
          country: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          safety_rating: number | null
        }
        Insert: {
          average_cost?: number | null
          best_seasons?: Database["public"]["Enums"]["season_type"][] | null
          category: string
          country: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          safety_rating?: number | null
        }
        Update: {
          average_cost?: number | null
          best_seasons?: Database["public"]["Enums"]["season_type"][] | null
          category?: string
          country?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          safety_rating?: number | null
        }
        Relationships: []
      }
      itineraries: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          estimated_cost: number | null
          id: string
          is_public: boolean | null
          share_token: string | null
          start_date: string | null
          title: string
          total_days: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          estimated_cost?: number | null
          id?: string
          is_public?: boolean | null
          share_token?: string | null
          start_date?: string | null
          title: string
          total_days?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          estimated_cost?: number | null
          id?: string
          is_public?: boolean | null
          share_token?: string | null
          start_date?: string | null
          title?: string
          total_days?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "itineraries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      itinerary_activities: {
        Row: {
          attraction_id: string | null
          created_at: string | null
          day_id: string | null
          description: string | null
          end_time: string | null
          estimated_cost: number | null
          id: string
          notes: string | null
          order_index: number | null
          start_time: string | null
          title: string
        }
        Insert: {
          attraction_id?: string | null
          created_at?: string | null
          day_id?: string | null
          description?: string | null
          end_time?: string | null
          estimated_cost?: number | null
          id?: string
          notes?: string | null
          order_index?: number | null
          start_time?: string | null
          title: string
        }
        Update: {
          attraction_id?: string | null
          created_at?: string | null
          day_id?: string | null
          description?: string | null
          end_time?: string | null
          estimated_cost?: number | null
          id?: string
          notes?: string | null
          order_index?: number | null
          start_time?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_activities_attraction_id_fkey"
            columns: ["attraction_id"]
            isOneToOne: false
            referencedRelation: "attractions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itinerary_activities_day_id_fkey"
            columns: ["day_id"]
            isOneToOne: false
            referencedRelation: "itinerary_days"
            referencedColumns: ["id"]
          },
        ]
      }
      itinerary_days: {
        Row: {
          created_at: string | null
          date: string | null
          day_number: number
          id: string
          itinerary_id: string | null
          notes: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          day_number: number
          id?: string
          itinerary_id?: string | null
          notes?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          day_number?: number
          id?: string
          itinerary_id?: string | null
          notes?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_days_itinerary_id_fkey"
            columns: ["itinerary_id"]
            isOneToOne: false
            referencedRelation: "itineraries"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          location: string | null
          preferred_interests:
            | Database["public"]["Enums"]["interest_category"][]
            | null
          settings: Json | null
          updated_at: string | null
          user_type: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          location?: string | null
          preferred_interests?:
            | Database["public"]["Enums"]["interest_category"][]
            | null
          settings?: Json | null
          updated_at?: string | null
          user_type: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          location?: string | null
          preferred_interests?:
            | Database["public"]["Enums"]["interest_category"][]
            | null
          settings?: Json | null
          updated_at?: string | null
          user_type?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          attraction_id: string | null
          correct_answer: string
          created_at: string | null
          destination_id: string | null
          id: string
          options: Json | null
          order_index: number
          points: number | null
          question_text: string
          question_type: string | null
          quiz_id: string
        }
        Insert: {
          attraction_id?: string | null
          correct_answer: string
          created_at?: string | null
          destination_id?: string | null
          id?: string
          options?: Json | null
          order_index: number
          points?: number | null
          question_text: string
          question_type?: string | null
          quiz_id: string
        }
        Update: {
          attraction_id?: string | null
          correct_answer?: string
          created_at?: string | null
          destination_id?: string | null
          id?: string
          options?: Json | null
          order_index?: number
          points?: number | null
          question_text?: string
          question_type?: string | null
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_attraction_id_fkey"
            columns: ["attraction_id"]
            isOneToOne: false
            referencedRelation: "attractions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          answers: Json | null
          completed_at: string | null
          id: string
          quiz_id: string
          score: number | null
          student_id: string
          time_taken: number | null
          total_points: number
        }
        Insert: {
          answers?: Json | null
          completed_at?: string | null
          id?: string
          quiz_id: string
          score?: number | null
          student_id: string
          time_taken?: number | null
          total_points: number
        }
        Update: {
          answers?: Json | null
          completed_at?: string | null
          id?: string
          quiz_id?: string
          score?: number | null
          student_id?: string
          time_taken?: number | null
          total_points?: number
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          category: Database["public"]["Enums"]["quiz_category"]
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          quiz_link: string
          teacher_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["quiz_category"]
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          quiz_link: string
          teacher_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["quiz_category"]
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          quiz_link?: string
          teacher_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          attraction_id: string | null
          cons: string[] | null
          content: string | null
          created_at: string | null
          destination_id: string | null
          helpful_count: number | null
          id: string
          is_approved: boolean | null
          pros: string[] | null
          rating: number | null
          title: string | null
          updated_at: string | null
          user_id: string | null
          visit_date: string | null
        }
        Insert: {
          attraction_id?: string | null
          cons?: string[] | null
          content?: string | null
          created_at?: string | null
          destination_id?: string | null
          helpful_count?: number | null
          id?: string
          is_approved?: boolean | null
          pros?: string[] | null
          rating?: number | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
          visit_date?: string | null
        }
        Update: {
          attraction_id?: string | null
          cons?: string[] | null
          content?: string | null
          created_at?: string | null
          destination_id?: string | null
          helpful_count?: number | null
          id?: string
          is_approved?: boolean | null
          pros?: string[] | null
          rating?: number | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
          visit_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_attraction_id_fkey"
            columns: ["attraction_id"]
            isOneToOne: false
            referencedRelation: "attractions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_progress: {
        Row: {
          average_score: number | null
          category: Database["public"]["Enums"]["quiz_category"]
          id: string
          student_id: string
          total_possible_points: number | null
          total_quizzes_taken: number | null
          total_score: number | null
          updated_at: string | null
        }
        Insert: {
          average_score?: number | null
          category: Database["public"]["Enums"]["quiz_category"]
          id?: string
          student_id: string
          total_possible_points?: number | null
          total_quizzes_taken?: number | null
          total_score?: number | null
          updated_at?: string | null
        }
        Update: {
          average_score?: number | null
          category?: Database["public"]["Enums"]["quiz_category"]
          id?: string
          student_id?: string
          total_possible_points?: number | null
          total_quizzes_taken?: number | null
          total_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      travel_guides: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          destination_id: string | null
          featured_image: string | null
          id: string
          is_published: boolean | null
          read_time: number | null
          season: Database["public"]["Enums"]["season_type"] | null
          tags: string[] | null
          title: string
          trip_type: Database["public"]["Enums"]["trip_type"] | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          destination_id?: string | null
          featured_image?: string | null
          id?: string
          is_published?: boolean | null
          read_time?: number | null
          season?: Database["public"]["Enums"]["season_type"] | null
          tags?: string[] | null
          title: string
          trip_type?: Database["public"]["Enums"]["trip_type"] | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          destination_id?: string | null
          featured_image?: string | null
          id?: string
          is_published?: boolean | null
          read_time?: number | null
          season?: Database["public"]["Enums"]["season_type"] | null
          tags?: string[] | null
          title?: string
          trip_type?: Database["public"]["Enums"]["trip_type"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "travel_guides_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "travel_guides_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_photos: {
        Row: {
          attraction_id: string | null
          caption: string | null
          created_at: string | null
          destination_id: string | null
          id: string
          image_url: string
          is_approved: boolean | null
          user_id: string | null
        }
        Insert: {
          attraction_id?: string | null
          caption?: string | null
          created_at?: string | null
          destination_id?: string | null
          id?: string
          image_url: string
          is_approved?: boolean | null
          user_id?: string | null
        }
        Update: {
          attraction_id?: string | null
          caption?: string | null
          created_at?: string | null
          destination_id?: string | null
          id?: string
          image_url?: string
          is_approved?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_photos_attraction_id_fkey"
            columns: ["attraction_id"]
            isOneToOne: false
            referencedRelation: "attractions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_photos_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_photos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          budget_range: string | null
          created_at: string
          id: string
          preferred_airlines: Json | null
          preferred_destinations: Json | null
          travel_style: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          budget_range?: string | null
          created_at?: string
          id?: string
          preferred_airlines?: Json | null
          preferred_destinations?: Json | null
          travel_style?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          budget_range?: string | null
          created_at?: string
          id?: string
          preferred_airlines?: Json | null
          preferred_destinations?: Json | null
          travel_style?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          attraction_id: string | null
          created_at: string | null
          destination_id: string | null
          id: string
          notes: string | null
          user_id: string | null
        }
        Insert: {
          attraction_id?: string | null
          created_at?: string | null
          destination_id?: string | null
          id?: string
          notes?: string | null
          user_id?: string | null
        }
        Update: {
          attraction_id?: string | null
          created_at?: string | null
          destination_id?: string | null
          id?: string
          notes?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_attraction_id_fkey"
            columns: ["attraction_id"]
            isOneToOne: false
            referencedRelation: "attractions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlists_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_booking_reference: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_itinerary_share_token: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_quiz_link: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      interest_category:
        | "adventure"
        | "wildlife"
        | "beaches"
        | "historical"
        | "cultural"
        | "food"
        | "nature"
        | "urban"
        | "spiritual"
        | "photography"
      quiz_category:
        | "art"
        | "science"
        | "weather"
        | "physics"
        | "geography"
        | "math"
        | "language"
        | "astronomy"
        | "health"
      season_type: "spring" | "summer" | "autumn" | "winter" | "year_round"
      trip_type: "solo" | "couple" | "family" | "group" | "business"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      interest_category: [
        "adventure",
        "wildlife",
        "beaches",
        "historical",
        "cultural",
        "food",
        "nature",
        "urban",
        "spiritual",
        "photography",
      ],
      quiz_category: [
        "art",
        "science",
        "weather",
        "physics",
        "geography",
        "math",
        "language",
        "astronomy",
        "health",
      ],
      season_type: ["spring", "summer", "autumn", "winter", "year_round"],
      trip_type: ["solo", "couple", "family", "group", "business"],
    },
  },
} as const
