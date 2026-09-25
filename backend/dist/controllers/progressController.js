"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeLesson = completeLesson;
const supabase_1 = require("../config/supabase");
async function completeLesson(req, res) {
    try {
        const { user_id, course_id, lesson_id } = req.body;
        const { data, error } = await supabase_1.supabase
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
    }
    catch {
        res.status(500).json({
            error: "Server error"
        });
    }
}
