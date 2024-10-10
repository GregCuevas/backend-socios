// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("SUPABASE_URL y SUPABASE_KEY son requeridos");
}

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export { supabaseClient };
