"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_1 = require("./config/supabase");
async function testDatabase() {
    const { data, error } = await supabase_1.supabase
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
