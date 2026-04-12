import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// We use the SECRET KEY or SERVICE ROLE for admin actions to bypass RLS in the server via Server Actions
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY! 

export const supabase = createClient(supabaseUrl, supabaseKey)
