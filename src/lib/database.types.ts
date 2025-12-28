export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    email: string;
                    full_name: string | null;
                    avatar_url: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id: string;
                    email: string;
                    full_name?: string | null;
                    avatar_url?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    email?: string;
                    full_name?: string | null;
                    avatar_url?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            popups: {
                Row: {
                    id: string;
                    user_id: string;
                    name: string;
                    type: 'exit_intent' | 'scroll' | 'time_based' | 'custom';
                    headline: string;
                    subtext: string;
                    cta_text: string;
                    is_active: boolean;
                    impressions: number;
                    clicks: number;
                    conversions: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    name: string;
                    type: 'exit_intent' | 'scroll' | 'time_based' | 'custom';
                    headline: string;
                    subtext: string;
                    cta_text: string;
                    is_active?: boolean;
                    impressions?: number;
                    clicks?: number;
                    conversions?: number;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    name?: string;
                    type?: 'exit_intent' | 'scroll' | 'time_based' | 'custom';
                    headline?: string;
                    subtext?: string;
                    cta_text?: string;
                    is_active?: boolean;
                    impressions?: number;
                    clicks?: number;
                    conversions?: number;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            analytics: {
                Row: {
                    id: string;
                    popup_id: string;
                    event_type: 'impression' | 'click' | 'conversion' | 'close';
                    visitor_tag: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    popup_id: string;
                    event_type: 'impression' | 'click' | 'conversion' | 'close';
                    visitor_tag?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    popup_id?: string;
                    event_type?: 'impression' | 'click' | 'conversion' | 'close';
                    visitor_tag?: string | null;
                    created_at?: string;
                };
            };
        };
    };
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Popup = Database['public']['Tables']['popups']['Row'];
export type Analytics = Database['public']['Tables']['analytics']['Row'];
