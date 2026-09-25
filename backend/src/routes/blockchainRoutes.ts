import { Router, Request, Response } from "express";
import blockchainBackend from "../services/blockchainService";

const router = Router();

/**
 * GET /api/blockchain/status
 * Returns network, contract addresses and admin wallet
 */
router.get("/status", async (_req: Request, res: Response) => {
  try {
    res.json({
      status: "connected",
      rpcUrl: process.env.RPC_URL || "http://127.0.0.1:8545",
      chainId: 31337,
      contracts: blockchainBackend.addresses_,
    });
  } catch (err) {
    res.status(500).json({ error: "Blockchain not reachable", detail: String(err) });
  }
});

/**
 * GET /api/blockchain/balance/:address
 * Returns MX token balance for a given wallet address
 */
router.get("/balance/:address", async (req: Request, res: Response) => {
  try {
    const address = req.params["address"] as string;
    const balance = await blockchainBackend.getMXBalance(address);
    res.json({ address, mxBalance: balance, symbol: "MX" });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

/**
 * POST /api/blockchain/mint-reward
 * Body: { learnerAddress, milestone }
 * Mints MX reward tokens to the learner's wallet
 */
router.post("/mint-reward", async (req: Request, res: Response) => {
  const { learnerAddress, milestone } = req.body as {
    learnerAddress: string;
    milestone: "lessonCompletion" | "quizPass" | "assignmentPass" | "courseCompletion";
  };

  if (!learnerAddress || !milestone) {
    res.status(400).json({ error: "learnerAddress and milestone are required" });
    return;
  }

  try {
    const txHash = await blockchainBackend.mintReward(learnerAddress, milestone);
    const newBalance = await blockchainBackend.getMXBalance(learnerAddress);
    res.json({ success: true, txHash, newMXBalance: newBalance, milestone });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

/**
 * POST /api/blockchain/mint-certificate
 * Body: { learnerAddress, courseTitle, learnerName, score }
 * Mints a soulbound certificate NFT upon course completion
 */
router.post("/mint-certificate", async (req: Request, res: Response) => {
  const { learnerAddress, courseTitle, learnerName, score } = req.body as {
    learnerAddress: string;
    courseTitle: string;
    learnerName: string;
    score: number;
  };

  if (!learnerAddress || !courseTitle || score === undefined) {
    res.status(400).json({ error: "learnerAddress, courseTitle, and score are required" });
    return;
  }

  try {
    const result = await blockchainBackend.mintCertificate(
      learnerAddress,
      courseTitle,
      learnerName || learnerAddress.slice(0, 8),
      score
    );
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

/**
 * GET /api/blockchain/certificates/:address
 * Returns all certificate token IDs for a learner
 */
router.get("/certificates/:address", async (req: Request, res: Response) => {
  try {
    const address = req.params["address"] as string;
    const tokenIds = await blockchainBackend.getLearnerCertificates(address);
    res.json({ address, certificates: tokenIds });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

/**
 * POST /api/blockchain/courses/register
 * Body: { courseId, title, priceEth, rewardPoolMX }
 * Registers a new course on-chain (Draft status)
 */
router.post("/courses/register", async (req: Request, res: Response) => {
  const { courseId, title, priceEth = "0.01", rewardPoolMX = 500 } = req.body as {
    courseId: string;
    title: string;
    priceEth?: string;
    rewardPoolMX?: number;
  };

  if (!courseId || !title) {
    res.status(400).json({ error: "courseId and title are required" });
    return;
  }

  try {
    const txHash = await blockchainBackend.registerCourse(courseId, title, priceEth, rewardPoolMX);
    res.json({ success: true, courseId, txHash, status: "Draft" });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

/**
 * POST /api/blockchain/courses/:courseId/approve
 * Admin approves a course (sets status to Published on-chain)
 */
router.post("/courses/:courseId/approve", async (req: Request, res: Response) => {
  try {
    const courseId = req.params["courseId"] as string;
    const txHash = await blockchainBackend.approveCourse(courseId);
    res.json({ success: true, courseId, txHash, status: "Published" });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

/**
 * GET /api/blockchain/courses/:courseId
 * Returns on-chain course data
 */
router.get("/courses/:courseId", async (req: Request, res: Response) => {
  try {
    const courseId = req.params["courseId"] as string;
    const course = await blockchainBackend.getCourseOnChain(courseId);
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

/**
 * GET /api/blockchain/courses/:courseId/enrolled/:address
 * Checks if a learner is enrolled in a course
 */
router.get("/courses/:courseId/enrolled/:address", async (req: Request, res: Response) => {
  try {
    const courseId = req.params["courseId"] as string;
    const address = req.params["address"] as string;
    const enrolled = await blockchainBackend.isEnrolled(courseId, address);
    res.json({ courseId, address, enrolled });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
