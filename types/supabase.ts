export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
    public: {
        Tables: {
            boards: {
                Row: {
                    background: string | null;
                    created_at: string;
                    creator: string;
                    id: number;
                    last_edit: string;
                    title: string | null;
                };
                Insert: {
                    background?: string | null;
                    created_at?: string;
                    creator: string;
                    id?: number;
                    last_edit?: string;
                    title?: string | null;
                };
                Update: {
                    background?: string | null;
                    created_at?: string;
                    creator?: string;
                    id?: number;
                    last_edit?: string;
                    title?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "boards_creator_fkey";
                        columns: ["creator"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            cards: {
                Row: {
                    assigned_to: string | null;
                    board_id: number;
                    created_at: string;
                    description: string | null;
                    done: boolean | null;
                    id: number;
                    image_url: string | null;
                    list_id: number;
                    position: number;
                    title: string | null;
                };
                Insert: {
                    assigned_to?: string | null;
                    board_id: number;
                    created_at?: string;
                    description?: string | null;
                    done?: boolean | null;
                    id?: number;
                    image_url?: string | null;
                    list_id: number;
                    position?: number;
                    title?: string | null;
                };
                Update: {
                    assigned_to?: string | null;
                    board_id?: number;
                    created_at?: string;
                    description?: string | null;
                    done?: boolean | null;
                    id?: number;
                    image_url?: string | null;
                    list_id?: number;
                    position?: number;
                    title?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "cards_assigned_to_fkey";
                        columns: ["assigned_to"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "cards_board_id_fkey";
                        columns: ["board_id"];
                        isOneToOne: false;
                        referencedRelation: "boards";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "cards_list_id_fkey";
                        columns: ["list_id"];
                        isOneToOne: false;
                        referencedRelation: "lists";
                        referencedColumns: ["id"];
                    },
                ];
            };
            lists: {
                Row: {
                    board_id: number;
                    created_at: string;
                    id: number;
                    position: number;
                    title: string | null;
                };
                Insert: {
                    board_id: number;
                    created_at?: string;
                    id?: number;
                    position?: number;
                    title?: string | null;
                };
                Update: {
                    board_id?: number;
                    created_at?: string;
                    id?: number;
                    position?: number;
                    title?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "lists_board_id_fkey";
                        columns: ["board_id"];
                        isOneToOne: false;
                        referencedRelation: "boards";
                        referencedColumns: ["id"];
                    },
                ];
            };
            notifications: {
                Row: {
                    body: string;
                    card_id: number | null;
                    created_at: string;
                    id: number;
                    user_id: string;
                };
                Insert: {
                    body: string;
                    card_id?: number | null;
                    created_at?: string;
                    id?: number;
                    user_id: string;
                };
                Update: {
                    body?: string;
                    card_id?: number | null;
                    created_at?: string;
                    id?: number;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "notifications_card_id_fkey";
                        columns: ["card_id"];
                        isOneToOne: false;
                        referencedRelation: "cards";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "notifications_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            user_boards: {
                Row: {
                    board_id: number | null;
                    id: number;
                    user_id: string;
                };
                Insert: {
                    board_id?: number | null;
                    id?: number;
                    user_id: string;
                };
                Update: {
                    board_id?: number | null;
                    id?: number;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "user_boards_board_id_fkey";
                        columns: ["board_id"];
                        isOneToOne: false;
                        referencedRelation: "boards";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "user_boards_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            users: {
                Row: {
                    avatar_url: string | null;
                    email: string | null;
                    first_name: string | null;
                    id: string;
                    push_token: string | null;
                    username: string | null;
                };
                Insert: {
                    avatar_url?: string | null;
                    email?: string | null;
                    first_name?: string | null;
                    id: string;
                    push_token?: string | null;
                    username?: string | null;
                };
                Update: {
                    avatar_url?: string | null;
                    email?: string | null;
                    first_name?: string | null;
                    id?: string;
                    push_token?: string | null;
                    username?: string | null;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            get_boards_for_authenticated_user: {
                Args: Record<PropertyKey, never>;
                Returns: number[];
            };
            requesting_user_id: {
                Args: Record<PropertyKey, never>;
                Returns: string;
            };
            search_users: {
                Args: {
                    search: string;
                };
                Returns: {
                    avatar_url: string | null;
                    email: string | null;
                    first_name: string | null;
                    id: string;
                    push_token: string | null;
                    username: string | null;
                }[];
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
      ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
      ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
      ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
      ? PublicSchema["Enums"][PublicEnumNameOrOptions]
      : never;
