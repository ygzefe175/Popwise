import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Popup {
    id: string;
    name: string;
    type: 'exit_intent' | 'scroll' | 'time_based' | 'custom';
    headline: string;
    subtext: string;
    cta_text: string;
    position: 'center' | 'top_right' | 'top_left' | 'bottom_right' | 'bottom_left' | 'top_center' | 'bottom_center';
    is_active: boolean;
    created_at: string;
    impressions?: number;
    clicks?: number;
}

export function usePopups(userId: string | null) {
    const [popups, setPopups] = useState<Popup[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        fetchPopups();
    }, [userId]);

    const fetchPopups = async () => {
        try {
            setLoading(true);
            // Select only columns that definitely exist
            const { data, error } = await supabase
                .from('popups')
                .select('id, user_id, name, type, headline, subtext, cta_text, is_active, created_at, impressions, clicks')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) {
                // If there's a column error, try minimal columns
                if (error.code === 'PGRST204' || error.code === '42703') {
                    console.warn('Some columns missing, trying minimal fetch...');
                    const { data: minData, error: minError } = await supabase
                        .from('popups')
                        .select('id, user_id, name, type, headline, subtext, cta_text, is_active, created_at')
                        .eq('user_id', userId)
                        .order('created_at', { ascending: false });

                    if (minError) throw minError;
                    // Add default values for missing columns
                    const enrichedData = (minData || []).map(p => ({
                        ...p,
                        impressions: 0,
                        clicks: 0,
                        position: 'center'
                    }));
                    setPopups(enrichedData as Popup[]);
                    return;
                }
                throw error;
            }

            // Add default position for popups that don't have it
            const enrichedData = (data || []).map(p => ({
                ...p,
                position: (p as any).position || 'center'
            }));
            setPopups(enrichedData as Popup[]);
        } catch (error) {
            console.error('Error fetching popups:', error);
        } finally {
            setLoading(false);
        }
    };

    const createPopup = async (name: string, headline: string, subtext: string, cta_text: string, position: 'center' | 'top_right' | 'top_left' | 'bottom_right' | 'bottom_left' | 'top_center' | 'bottom_center' = 'center', type: any = 'exit_intent') => {
        try {
            if (!userId) throw new Error('User not found');

            // Start with basic data without position (most compatible)
            const basicData: any = {
                user_id: userId,
                name,
                type,
                headline,
                subtext,
                cta_text,
                is_active: true
            };

            // First try without position column (works with older DB schemas)
            let { data, error } = await supabase
                .from('popups')
                .insert([basicData])
                .select()
                .single();

            // If successful with basic data, add position locally for UI
            if (!error && data) {
                data.position = position;
            }

            // Fallback: If type constraint fails (old DB version), default to 'exit_intent'
            if (error && error.code === '23514') { // Check constraint violation
                console.warn('Type constraint violation, defaulting to exit_intent...');
                const retry = await supabase
                    .from('popups')
                    .insert([{ ...basicData, type: 'exit_intent' }])
                    .select()
                    .single();
                data = retry.data;
                error = retry.error;
                if (!error && data) {
                    data.position = position;
                }
            }


            if (error) {
                console.error('Supabase Error Details:', {
                    message: error.message,
                    details: error.details,
                    hint: error.hint,
                    code: error.code
                });
                throw error;
            }

            setPopups([data, ...popups]);
            return { data, error: null };
        } catch (error: any) {
            console.error('Error creating popup:', error.message || error);
            return { data: null, error };
        }
    };

    const deletePopup = async (id: string) => {
        try {
            const { error } = await supabase
                .from('popups')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setPopups(popups.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting popup:', error);
        }
    };

    const togglePopupStatus = async (id: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('popups')
                .update({ is_active: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setPopups(popups.map(p => p.id === id ? { ...p, is_active: !currentStatus } : p));
        } catch (error) {
            console.error('Error updating popup:', error);
        }
    };

    return {
        popups,
        loading,
        createPopup,
        deletePopup,
        togglePopupStatus,
        refresh: fetchPopups
    };
}
