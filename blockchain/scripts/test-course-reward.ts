import "dotenv/config";
import { ethers } from "ethers";

import { getMXBalance } from "../services/token.js";
import { issueCourseReward } from "../services/rewards.js";

async function main() {
  const provider = new ethers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL
  );

  const signer = new ethers.Wallet(
    process.env.DEPLOYER_PRIVATE_KEY!,
    provider
  );

  const userAddress = signer.address;
  const courseId = "COURSE-001";
  const score = 95;
  const passed = true;

  console.log("User:", userAddress);
  console.log("Course:", courseId);
  console.log("Score:", score);
  console.log("Passed:", passed);

  const beforeBalance =
    await getMXBalance(userAddress);

  console.log("Before MX balance:", beforeBalance);

  const result = await issueCourseReward(
    signer,
    userAddress,
    courseId,
    score,
    passed
  );

  console.log("\nReward Result:");
  console.log(result);

  const afterBalance =
    await getMXBalance(userAddress);

  console.log(
    "After MX balance:",
    afterBalance
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});