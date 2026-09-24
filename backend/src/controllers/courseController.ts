import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export async function createCourse(req: Request, res: Response) {
  try {
    const {
      provider_id,
      title,
      description,
      thumbnail_url,
      price_mx,
      status
    } = req.body;

    const { data, error } = await supabase
      .from("courses")
      .insert({
        provider_id,
        title,
        description,
        thumbnail_url,
        price_mx: price_mx || 0,
        status: status || "draft"
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        error: error.message
      });
    }

    res.status(201).json(data);
  } catch {
    res.status(500).json({
      error: "Server error"
    });
  }
}
