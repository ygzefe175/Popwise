-- =====================================================
-- POOPUP EMBED SYSTEM - DATABASE FUNCTIONS
-- Run this in your Supabase SQL Editor
-- =====================================================

-- 1. Add impressions and clicks columns if they don't exist
ALTER TABLE popups ADD COLUMN IF NOT EXISTS impressions INTEGER DEFAULT 0;
ALTER TABLE popups ADD COLUMN IF NOT EXISTS clicks INTEGER DEFAULT 0;

-- 2. Create function to increment impressions
CREATE OR REPLACE FUNCTION increment_impressions(popup_id_param UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE popups 
    SET impressions = COALESCE(impressions, 0) + 1 
    WHERE id = popup_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create function to increment clicks
CREATE OR REPLACE FUNCTION increment_clicks(popup_id_param UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE popups 
    SET clicks = COALESCE(clicks, 0) + 1 
    WHERE id = popup_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Create popup_events table for detailed analytics (optional)
CREATE TABLE IF NOT EXISTS popup_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    popup_id UUID REFERENCES popups(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN ('impression', 'click', 'close')),
    url TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_popup_events_popup_id ON popup_events(popup_id);
CREATE INDEX IF NOT EXISTS idx_popup_events_created_at ON popup_events(created_at);

-- 6. Enable RLS on popup_events
ALTER TABLE popup_events ENABLE ROW LEVEL SECURITY;

-- 7. Policy to allow inserts from API (for tracking)
CREATE POLICY "Allow anonymous inserts for tracking" ON popup_events
    FOR INSERT
    WITH CHECK (true);

-- 8. Policy to allow users to read their own events
CREATE POLICY "Users can read their own popup events" ON popup_events
    FOR SELECT
    USING (
        popup_id IN (
            SELECT id FROM popups WHERE user_id = auth.uid()
        )
    );

-- 9. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT EXECUTE ON FUNCTION increment_impressions TO anon;
GRANT EXECUTE ON FUNCTION increment_clicks TO anon;
GRANT INSERT ON popup_events TO anon;

-- 10. Allow anonymous users to read popups (for pixel.js)
CREATE POLICY "Allow public read of active popups" ON popups
    FOR SELECT
    USING (is_active = true);

SELECT 'Embed system database setup complete!' as status;
