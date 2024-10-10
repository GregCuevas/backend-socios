import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

// Variables de entorno de Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Validar si las variables de entorno están definidas
if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL y SUPABASE_KEY son requeridos");
}

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
