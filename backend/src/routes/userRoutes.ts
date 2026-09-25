import { Router } from "express";
import { createUser, getUserById, getUserBalance, getUsers } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.get("/:userId/balance", getUserBalance);

export default router;
