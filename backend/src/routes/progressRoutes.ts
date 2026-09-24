import { Router } from "express";
import { completeLesson } from "../controllers/progressController";

const router = Router();

router.post("/complete", completeLesson);

export default router;
