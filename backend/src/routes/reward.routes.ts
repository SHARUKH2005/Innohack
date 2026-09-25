import { Router } from "express";
import { getUserRewards } from "../controllers/reward.controller";

const router = Router();

router.get("/user/:userId", getUserRewards);
router.get("/:userId", getUserRewards);

export default router;
