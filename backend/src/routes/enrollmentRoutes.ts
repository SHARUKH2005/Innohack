import { Router } from "express";
import { enrollUser, getUserEnrollments } from "../controllers/enrollmentController";

const router = Router();

router.post("/", enrollUser);
router.get("/user/:userId", getUserEnrollments);
router.get("/:userId", getUserEnrollments);

export default router;
