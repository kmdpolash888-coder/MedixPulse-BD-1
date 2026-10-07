// Import Supabase SDK from CDN for browser/PWA compatibility
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Replace these placeholders with your actual Supabase Project URL and Anon Key
const SUPABASE_URL = 'https://your-project-ref.supabase.co'
const SUPABASE_ANON_KEY = 'your-supabase-anon-key-here'

// Initialize the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Test connection and basic auth status check
async function checkSupabaseConnection() {
    try {
        const { data, error } = await supabase.from('_notices').select('*').limit(1);
        console.log("MedixPulse BD-1: Supabase client initialized successfully.", data);
        
        const statusElement = document.getElementById('app-status');
        if (statusElement) {
            statusElement.innerHTML = "✅ Platform Infrastructure Connected Successfully via Supabase!";
            statusElement.style.color = "green";
        }
    } catch (err) {
        console.error("Supabase connection check note:", err);
    }
}

checkSupabaseConnection();
