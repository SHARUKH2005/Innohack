import "dotenv/config";
import { ethers } from "ethers";

import {
  getMXBalance,
  mintMXReward,
} from "../services/token.js";

import {
  calculateCourseReward,
} from "../services/rewards.js";

async function main() {
  const provider = new ethers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL
  );

  const signer = new ethers.Wallet(
    process.env.DEPLOYER_PRIVATE_KEY!,
    provider
  );

  const userAddress = signer.address;

  // Simulated completed course result
  const score = 95;
  const passed = true;

  const reward = calculateCourseReward(
    score,
    passed
  );

  console.log("User:", userAddress);
  console.log("Score:", score);
  console.log("Passed:", passed);
  console.log("Reward:", reward, "MX");

  if (reward === "0") {
    console.log("No reward. Course not eligible.");
    return;
  }

  const beforeBalance =
    await getMXBalance(userAddress);

  console.log("Before MX balance:", beforeBalance);

  const result = await mintMXReward(
    signer,
    userAddress,
    reward,
    `Course completion - Score ${score}`
  );

  console.log(
    "Transaction Hash:",
    result.transactionHash
  );

  const afterBalance =
    await getMXBalance(userAddress);

  console.log("After MX balance:", afterBalance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});