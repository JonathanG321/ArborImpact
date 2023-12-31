export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admins_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          id: number
          profile_id: string
          project_id: number
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: number
          profile_id: string
          project_id: number
        }
        Update: {
          amount?: number
          created_at?: string
          id?: number
          profile_id?: string
          project_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "donations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile_balances"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "donations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string
          discount: number
          id: number
          name: string
          product_image_url: string | null
          sdg: string
          status: string
          unlock_shares: number
        }
        Insert: {
          created_at?: string
          description?: string
          discount?: number
          id?: number
          name?: string
          product_image_url?: string | null
          sdg?: string
          status?: string
          unlock_shares?: number
        }
        Update: {
          created_at?: string
          description?: string
          discount?: number
          id?: number
          name?: string
          product_image_url?: string | null
          sdg?: string
          status?: string
          unlock_shares?: number
        }
        Relationships: [
          {
            foreignKeyName: "products_sdg_fkey"
            columns: ["sdg"]
            isOneToOne: false
            referencedRelation: "sdgs"
            referencedColumns: ["id"]
          }
        ]
      }
      profile_sdgs: {
        Row: {
          profile_id: string
          sdg_id: string
        }
        Insert: {
          profile_id?: string
          sdg_id: string
        }
        Update: {
          profile_id?: string
          sdg_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_sdgs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile_balances"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "profile_sdgs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_sdgs_sdg_id_fkey"
            columns: ["sdg_id"]
            isOneToOne: false
            referencedRelation: "sdgs"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string
          birth_date: string
          created_at: string
          first_name: string
          id: string
          last_name: string
          location: string
          made_first_donation: boolean
          requesting_funds: boolean
          seen_marketplace: boolean
          want_difference_world: boolean
          want_diversify_portfolio: boolean
          want_specific_cause: boolean
          want_tax_incentives: boolean
        }
        Insert: {
          avatar_url?: string
          birth_date?: string
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          location?: string
          made_first_donation?: boolean
          requesting_funds?: boolean
          seen_marketplace?: boolean
          want_difference_world?: boolean
          want_diversify_portfolio?: boolean
          want_specific_cause?: boolean
          want_tax_incentives?: boolean
        }
        Update: {
          avatar_url?: string
          birth_date?: string
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          location?: string
          made_first_donation?: boolean
          requesting_funds?: boolean
          seen_marketplace?: boolean
          want_difference_world?: boolean
          want_diversify_portfolio?: boolean
          want_specific_cause?: boolean
          want_tax_incentives?: boolean
        }
        Relationships: []
      }
      projects: {
        Row: {
          activity: string
          brief: string
          created_at: string
          description: string
          donation_currency: string
          extra_images: string[]
          funding_goal: number
          goal_date: string
          id: number
          impact_goal: number
          impact_goal_unit: string
          impact_type: string
          name: string
          project_image_url: string
          region: string
          sdg: string
          unique_impact_metric_unit: string
          universal_impact_metric_unit: string
        }
        Insert: {
          activity?: string
          brief?: string
          created_at?: string
          description?: string
          donation_currency?: string
          extra_images?: string[]
          funding_goal?: number
          goal_date?: string
          id?: number
          impact_goal?: number
          impact_goal_unit?: string
          impact_type?: string
          name?: string
          project_image_url?: string
          region?: string
          sdg?: string
          unique_impact_metric_unit?: string
          universal_impact_metric_unit?: string
        }
        Update: {
          activity?: string
          brief?: string
          created_at?: string
          description?: string
          donation_currency?: string
          extra_images?: string[]
          funding_goal?: number
          goal_date?: string
          id?: number
          impact_goal?: number
          impact_goal_unit?: string
          impact_type?: string
          name?: string
          project_image_url?: string
          region?: string
          sdg?: string
          unique_impact_metric_unit?: string
          universal_impact_metric_unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_sdg_fkey"
            columns: ["sdg"]
            isOneToOne: false
            referencedRelation: "sdgs"
            referencedColumns: ["id"]
          }
        ]
      }
      recharges: {
        Row: {
          amount: number
          created_at: string
          id: number
          profile_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: number
          profile_id?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recharges_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile_balances"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "recharges_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      sdgs: {
        Row: {
          id: string
        }
        Insert: {
          id?: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
      spending_reports: {
        Row: {
          amount: number
          cost: number
          created_at: string
          id: number
          item: string
          project_id: number
        }
        Insert: {
          amount?: number
          cost?: number
          created_at?: string
          id?: number
          item?: string
          project_id: number
        }
        Update: {
          amount?: number
          cost?: number
          created_at?: string
          id?: number
          item?: string
          project_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "spending_reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      profile_balances: {
        Row: {
          balance: number | null
          profile_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_product_image: {
        Args: {
          product_image_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_project_image: {
        Args: {
          project_image_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
