import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mobmyuvmszuahoqkdhnl.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vYm15dXZtc3p1YWhvcWtkaG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NjQzNzUsImV4cCI6MjA4MjQ0MDM3NX0.b6WGybmTu6kukY2yb2mGRuYhwUldIF30r72AtZsgUPo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
