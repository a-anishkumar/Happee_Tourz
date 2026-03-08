/**
 * config/supabase.js
 * Initializes the Supabase client with the service role key for
 * server-side operations (bypasses RLS — use only in the backend).
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        // Service role key — never expose to the browser
        autoRefreshToken: false,
        persistSession: false,
    },
})

export default supabase
