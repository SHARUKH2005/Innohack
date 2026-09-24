import { Router } from "express";
import { createCourse } from "../controllers/courseController";

const router = Router();

router.post("/", createCourse);

export default router;
