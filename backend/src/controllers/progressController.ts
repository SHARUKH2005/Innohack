import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export async function completeLesson(req: Request, res: Response) {
  try {
    const { user_id, course_id, lesson_id } = req.body;

    const { data, error } = await supabase
      .from("progress")
      .insert({
        user_id,
        course_id,
        lesson_id,
        completed: true,
        completed_at: new Date().toISOString()
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
