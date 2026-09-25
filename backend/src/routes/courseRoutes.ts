import { Router } from "express";
import {
  createCourse,
  getCourses,
  getCourseById
} from "../controllers/courseController";

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);

export default router;
