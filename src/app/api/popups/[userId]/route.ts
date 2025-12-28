import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client for API routes with SERVICE_ROLE key to bypass RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ userId: string }> }
) {
    try {
        // In Next.js 14+ App Router, params is a Promise
        const { userId } = await context.params;

        console.log('[Popups API] Request for userId:', userId);

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        // First, try to fetch ALL popups for this user to debug
        let { data: allPopups, error: allError } = await supabase
            .from('popups')
            .select('id, name, type, headline, subtext, cta_text, is_active, user_id')
            .eq('user_id', userId);

        console.log('[Popups API] All popups for user:', allPopups);
        console.log('[Popups API] All popups error:', allError);

        // Now fetch only active ones
        let { data: popups, error } = await supabase
            .from('popups')
            .select('id, name, type, headline, subtext, cta_text, is_active')
            .eq('user_id', userId)
            .eq('is_active', true);

        console.log('[Popups API] Active popups:', popups);
        console.log('[Popups API] Active popups error:', error);

        if (error) {
            console.error('[Popups API] Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch popups', details: error.message },
                { status: 500 }
            );
        }

        // Add default position for all popups
        const enrichedPopups = (popups || []).map(p => ({
            ...p,
            position: 'center'
        }));

        // Return with CORS headers for cross-origin requests
        return NextResponse.json(
            { popups: enrichedPopups },
            {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Cache-Control': 'public, max-age=60', // Cache for 1 minute
                },
            }
        );
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Handle CORS preflight
export async function OPTIONS() {
    return NextResponse.json(
        {},
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        }
    );
}
