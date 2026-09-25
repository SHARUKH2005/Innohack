import { Router } from "express";
import {
  submitAssessment,
  aiEvaluateAssessment,
  getUserCourseAssessment
} from "../controllers/assessmentController";

const router = Router();

router.post("/submit", submitAssessment);
router.post("/ai-evaluate", aiEvaluateAssessment);
router.get("/user/:userId/course/:courseId", getUserCourseAssessment);

export default router;
