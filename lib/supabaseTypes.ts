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
      donations: {
        Row: {
          created_at: string
          donation: number
          profile_id: string
          project_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          donation?: number
          profile_id: string
          project_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          donation?: number
          profile_id?: string
          project_id?: number
          updated_at?: string
        }
        Relationships: [
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
      profiles: {
        Row: {
          avatar_url: string
          balance: number
          birth_date: string
          created_at: string
          first_name: string
          id: string
          last_name: string
          location: string
          sdg: string[]
          want_difference_world: boolean
          want_diversify_portfolio: boolean
          want_specific_cause: boolean
          want_tax_incentives: boolean
        }
        Insert: {
          avatar_url?: string
          balance?: number
          birth_date?: string
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          location?: string
          sdg?: string[]
          want_difference_world?: boolean
          want_diversify_portfolio?: boolean
          want_specific_cause?: boolean
          want_tax_incentives?: boolean
        }
        Update: {
          avatar_url?: string
          balance?: number
          birth_date?: string
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          location?: string
          sdg?: string[]
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
          created_at: string
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
        }
        Insert: {
          activity?: string
          created_at?: string
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
        }
        Update: {
          activity?: string
          created_at?: string
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
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
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
