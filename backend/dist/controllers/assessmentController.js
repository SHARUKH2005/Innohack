"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAssessment = submitAssessment;
exports.aiEvaluateAssessment = aiEvaluateAssessment;
const supabase_1 = require("../config/supabase");
const aiService_1 = require("../services/aiService");
async function submitAssessment(req, res) {
    try {
        const { user_id, course_id } = req.body;
        const { data, error } = await supabase_1.supabase
            .from("assessments")
            .insert({
            user_id,
            course_id,
            status: "pending"
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
async function aiEvaluateAssessment(req, res) {
    try {
        const { assessment_id, question, answer } = req.body;
        if (!assessment_id || !question || !answer) {
            return res.status(400).json({
                error: "assessment_id, question, and answer are required"
            });
        }
        // Run AI evaluation
        const result = await (0, aiService_1.evaluateAnswer)(question, answer);
        // status: passed if score >= 70, failed otherwise
        const status = result.passed ? "passed" : "failed";
        // Update the assessment record in Supabase
        const { data, error } = await supabase_1.supabase
            .from("assessments")
            .update({
            score: result.score,
            feedback: result.feedback,
            status,
            evaluated_at: new Date().toISOString()
        })
            .eq("id", assessment_id)
            .select()
            .single();
        if (error) {
            return res.status(400).json({
                error: error.message
            });
        }
        // Return the updated assessment along with detailed breakdown
        res.json({
            ...data,
            breakdown: result.breakdown
        });
    }
    catch (error) {
        console.error("AI Evaluation Error:", error);
        res.status(500).json({
            error: "AI evaluation failed"
        });
    }
}
