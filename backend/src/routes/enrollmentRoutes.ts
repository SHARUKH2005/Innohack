import { Router } from "express";
import { enrollUser } from "../controllers/enrollmentController";

const router = Router();

router.post("/", enrollUser);

export default router;
