import { supabase } from "./config/supabase";

async function testDatabase() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .limit(1);

  if (error) {
    console.error("Database connection failed:", error.message);
    return;
  }

  console.log("Supabase database connected successfully!");
  console.log(data);
}

testDatabase();
