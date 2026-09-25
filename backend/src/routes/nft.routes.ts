import { Router } from "express";
import { getUserNFTs } from "../controllers/nft.controller";

const router = Router();

router.get("/user/:userId", getUserNFTs);
router.get("/:userId", getUserNFTs);

export default router;
