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
      active_services: {
        Row: {
          agreed_price_per_service: number | null
          created_at: string
          has_scheduling_pattern: boolean | null
          id: number
          needs_scheduling: boolean | null
          provided_by: string | null
          provided_to: string | null
          scheduled_time: string | null
        }
        Insert: {
          agreed_price_per_service?: number | null
          created_at?: string
          has_scheduling_pattern?: boolean | null
          id?: number
          needs_scheduling?: boolean | null
          provided_by?: string | null
          provided_to?: string | null
          scheduled_time?: string | null
        }
        Update: {
          agreed_price_per_service?: number | null
          created_at?: string
          has_scheduling_pattern?: boolean | null
          id?: number
          needs_scheduling?: boolean | null
          provided_by?: string | null
          provided_to?: string | null
          scheduled_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_active_services_provided_by_fkey"
            columns: ["provided_by"]
            isOneToOne: false
            referencedRelation: "servicer_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_active_services_provided_to_fkey"
            columns: ["provided_to"]
            isOneToOne: false
            referencedRelation: "owner_info"
            referencedColumns: ["id"]
          }
        ]
      }
      owner_info: {
        Row: {
          created_at: string
          home: Json
          id: string
          interested_in: Database["public"]["Enums"]["ServiceType"][] | null
          settings_config: Json | null
        }
        Insert: {
          created_at?: string
          home: Json
          id?: string
          interested_in?: Database["public"]["Enums"]["ServiceType"][] | null
          settings_config?: Json | null
        }
        Update: {
          created_at?: string
          home?: Json
          id?: string
          interested_in?: Database["public"]["Enums"]["ServiceType"][] | null
          settings_config?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "public_owner_info_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          }
        ]
      }
      servicer_info: {
        Row: {
          business_address: Json
          business_description: string | null
          business_name: string
          created_at: string
          id: string
          settings_config: Json | null
        }
        Insert: {
          business_address: Json
          business_description?: string | null
          business_name: string
          created_at?: string
          id: string
          settings_config?: Json | null
        }
        Update: {
          business_address?: Json
          business_description?: string | null
          business_name?: string
          created_at?: string
          id?: string
          settings_config?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "public_servicer_info_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          }
        ]
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string | null
          negotiable: boolean | null
          owned_by: string | null
          price_per_service: number | null
          quoted: boolean | null
          recurring: boolean | null
          recurring_frequency: number | null
          recurring_timeframe: Database["public"]["Enums"]["TimeFrame"] | null
          short_description: string | null
          type: Database["public"]["Enums"]["ServiceType"] | null
          working_regions: Json | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id: number
          name?: string | null
          negotiable?: boolean | null
          owned_by?: string | null
          price_per_service?: number | null
          quoted?: boolean | null
          recurring?: boolean | null
          recurring_frequency?: number | null
          recurring_timeframe?: Database["public"]["Enums"]["TimeFrame"] | null
          short_description?: string | null
          type?: Database["public"]["Enums"]["ServiceType"] | null
          working_regions?: Json | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          negotiable?: boolean | null
          owned_by?: string | null
          price_per_service?: number | null
          quoted?: boolean | null
          recurring?: boolean | null
          recurring_frequency?: number | null
          recurring_timeframe?: Database["public"]["Enums"]["TimeFrame"] | null
          short_description?: string | null
          type?: Database["public"]["Enums"]["ServiceType"] | null
          working_regions?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "public_services_owned_by_fkey"
            columns: ["owned_by"]
            isOneToOne: false
            referencedRelation: "servicer_info"
            referencedColumns: ["id"]
          }
        ]
      }
      user_info: {
        Row: {
          created_at: string
          first_name: string
          id: string
          last_name: string
          type: Database["public"]["Enums"]["AccountType"]
          username: string
        }
        Insert: {
          created_at?: string
          first_name: string
          id?: string
          last_name: string
          type: Database["public"]["Enums"]["AccountType"]
          username: string
        }
        Update: {
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          type?: Database["public"]["Enums"]["AccountType"]
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      AccountType: "PROVIDER" | "OWNER"
      ServiceType: "LANDSCAPING" | "POOL_CARE" | "CLEANING" | "PEST_CONTROL"
      TimeFrame: "WEEK" | "MONTH" | "YEAR"
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
