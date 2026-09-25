import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export async function completeLesson(req: Request, res: Response) {
  try {
    const userId = req.body.userId || req.body.user_id;
    const courseId = req.body.courseId || req.body.course_id;
    const lessonId = req.body.lessonId || req.body.lesson_id;

    if (!userId || !courseId || !lessonId) {
      return res.status(400).json({ error: "Missing required parameters: userId, courseId, lessonId" });
    }

    const { data, error } = await supabase
      .from("progress")
      .upsert({
        user_id: userId,
        course_id: courseId,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString()
      }, { onConflict: "user_id,course_id,lesson_id" })
      .select();

    if (error) {
      // Fallback if onConflict fails without explicit constraint
      const { data: fallbackData, error: fallbackErr } = await supabase
        .from("progress")
        .upsert({
          user_id: userId,
          course_id: courseId,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString()
        })
        .select();

      if (fallbackErr) {
        return res.status(400).json({ error: fallbackErr.message });
      }

      return res.status(200).json(fallbackData?.[0] || { success: true });
    }

    res.status(200).json(data?.[0] || { success: true });
  } catch (err: any) {
    res.status(500).json({
      error: err.message || "Server error"
    });
  }
}

export async function getUserProgress(req: Request, res: Response) {
  try {
    const { userId, courseId } = req.params;

    let query = supabase.from("progress").select("*").eq("user_id", userId);

    if (courseId) {
      query = query.eq("course_id", courseId);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user progress" });
  }
}
