"use client";

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function SupabaseTest() {
    const [status, setStatus] = useState<string>('Loading...');
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        async function checkConnection() {
            try {
                // Simple query to a table named "test" (create it in Supabase if not exists)
                const { data, error } = await supabase.from('test').select('*').limit(5);
                if (error) {
                    setStatus(`Error: ${error.message}`);
                } else {
                    setStatus('Connected!');
                    setData(data ?? []);
                }
            } catch (e: any) {
                setStatus(`Exception: ${e.message}`);
            }
        }
        checkConnection();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
            <p className="mb-4">Status: {status}</p>
            {data.length > 0 && (
                <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    );
}
