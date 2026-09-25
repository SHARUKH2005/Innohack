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

export async function getCourses(req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
}

export async function getCourseById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { data: course, error: courseErr } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();

    if (courseErr || !course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Try fetching modules & lessons if table exists
    const { data: modules } = await supabase
      .from("modules")
      .select("*, lessons(*)")
      .eq("course_id", id)
      .order("order_index", { ascending: true });

    res.json({
      ...course,
      modules: modules || []
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch course details" });
  }
}
