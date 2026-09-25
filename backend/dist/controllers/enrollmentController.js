"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollUser = enrollUser;
const supabase_1 = require("../config/supabase");
async function enrollUser(req, res) {
    try {
        const { user_id, course_id } = req.body;
        const { data, error } = await supabase_1.supabase
            .from("enrollments")
            .insert({
            user_id,
            course_id,
            progress_percentage: 0
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
