import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from './utils/database.types';
export type Client = SupabaseClient<Database>;

let supabase: Client | undefined;
export default function getSupabaseClient(){
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    //console.log(supabaseUrl);
    //console.log(supabaseAnonKey);
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
    return supabase;
}
