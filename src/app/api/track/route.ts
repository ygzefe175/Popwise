import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { popup_id, event_type, url, user_agent } = body;

        if (!popup_id || !event_type) {
            return NextResponse.json(
                { error: 'popup_id and event_type are required' },
                { status: 400 }
            );
        }

        // Update impression or click count
        if (event_type === 'impression') {
            const { error } = await supabase.rpc('increment_impressions', { popup_id_param: popup_id });

            // Fallback if RPC doesn't exist - direct update
            if (error && error.code === '42883') {
                await supabase
                    .from('popups')
                    .update({ impressions: supabase.rpc('coalesce', { val: 'impressions', default_val: 0 }) })
                    .eq('id', popup_id);
            }
        } else if (event_type === 'click') {
            const { error } = await supabase.rpc('increment_clicks', { popup_id_param: popup_id });

            if (error && error.code === '42883') {
                await supabase
                    .from('popups')
                    .update({ clicks: supabase.rpc('coalesce', { val: 'clicks', default_val: 0 }) })
                    .eq('id', popup_id);
            }
        }

        // Log the event for analytics (optional - we can create this table later)
        try {
            await supabase.from('popup_events').insert({
                popup_id,
                event_type,
                url: url || null,
                user_agent: user_agent || null,
                created_at: new Date().toISOString()
            });
        } catch (e) {
            // Table might not exist yet, ignore
        }

        return NextResponse.json(
            { success: true },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            }
        );
    } catch (error) {
        console.error('Track API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function OPTIONS() {
    return NextResponse.json(
        {},
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        }
    );
}
