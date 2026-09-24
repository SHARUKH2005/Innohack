import { Router } from "express";
import {
  submitAssessment,
  aiEvaluateAssessment
} from "../controllers/assessmentController";

const router = Router();

router.post("/submit", submitAssessment);
router.post("/ai-evaluate", aiEvaluateAssessment);

export default router;
