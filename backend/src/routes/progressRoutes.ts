import { Router } from "express";
import { completeLesson, getUserProgress } from "../controllers/progressController";

const router = Router();

router.post("/complete", completeLesson);
router.get("/:userId", getUserProgress);
router.get("/:userId/:courseId", getUserProgress);

export default router;
