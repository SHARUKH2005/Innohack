import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, wallet_address } = req.body;

    if (!name || !email || !wallet_address) {
      return res.status(400).json({ error: "Name, email, and wallet_address are required" });
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, wallet_address }])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data[0]);
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
