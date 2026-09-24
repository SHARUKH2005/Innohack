import { Router } from "express";
import { createUser } from "../controllers/auth.controller";

const router = Router();

// POST /api/users
router.post("/users", createUser);

export default router;
