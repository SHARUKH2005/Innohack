import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import { evaluateAnswer } from "../services/aiService";
import { issueAssessmentReward } from "../services/rewardIntegrationService";

export async function submitAssessment(req: Request, res: Response) {
  try {
    const { user_id, course_id } = req.body;

    const { data, error } = await supabase
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
  } catch {
    res.status(500).json({
      error: "Server error"
    });
  }
}

export async function aiEvaluateAssessment(
  req: Request,
  res: Response
) {
  try {
    const { assessment_id, question, answer } = req.body;

    if (!assessment_id || !question || !answer) {
      return res.status(400).json({
        error: "assessment_id, question, and answer are required"
      });
    }

    // 1. Run AI evaluation
    const result = await evaluateAnswer(
      question,
      answer
    );

    // 2. Determine assessment status
    const status = result.passed
      ? "passed"
      : "failed";

    // 3. Update assessment in Supabase
    const { data, error } = await supabase
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

    // 4. Blockchain reward
    let reward = null;

    if (data && result.passed) {
      // Get assessment user and wallet address
      const {
        data: assessmentUser,
        error: userError
      } = await supabase
        .from("assessments")
        .select(`
          user_id,
          course_id,
          users (
            wallet_address
          )
        `)
        .eq("id", assessment_id)
        .single();

      if (userError) {
        throw new Error(
          `Unable to fetch user wallet: ${userError.message}`
        );
      }

      const user = Array.isArray(assessmentUser.users)
        ? assessmentUser.users[0]
        : assessmentUser.users;

      if (!user?.wallet_address) {
        throw new Error(
          "User wallet address not found"
        );
      }

      // Issue MX reward
      reward = await issueAssessmentReward(
        assessment_id,
        assessmentUser.user_id,
        assessmentUser.course_id,
        user.wallet_address,
        result.score,
        result.passed
      );
    }

    // 5. Return assessment + AI breakdown + blockchain reward
    res.json({
      ...data,
      breakdown: result.breakdown,
      reward
    });

  } catch (error) {
    console.error(
      "Assessment Evaluation / Reward Error:",
      error
    );

    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Assessment evaluation failed"
    });
  }
}