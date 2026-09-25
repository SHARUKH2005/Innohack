import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export async function getUserRewards(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from("rewards")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user rewards" });
  }
}
