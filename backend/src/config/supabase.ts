import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || "placeholder-key";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
  console.warn("[Supabase] WARNING: Supabase env vars missing — running in local/demo mode. DB features disabled.");
}

export const supabase = createClient(
  supabaseUrl,
  supabaseSecretKey
);
