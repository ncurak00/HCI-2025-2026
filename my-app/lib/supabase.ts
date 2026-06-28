import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = "https://lierdaxivbodamoexdgw.supabase.co";
const supabaseAnonKey = "sb_publishable_E7vMbtoB3B_3BfsVb1v2-w_rbLdofwC";

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
