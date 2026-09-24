import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, wallet_address, role } = req.body;

    const { data, error } = await supabase
      .from("users")
      .insert({
        name,
        email,
        wallet_address,
        role: role || "learner"
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        error: error.message
      });
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      error: "Server error"
    });
  }
}
