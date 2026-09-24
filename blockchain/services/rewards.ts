import { ethers } from "ethers";
import { mintMXReward } from "./token.js";

const rewardedCourses = new Set<string>();

export function calculateCourseReward(
  score: number,
  passed: boolean
): string {
  if (!passed) {
    return "0";
  }

  if (score >= 90) {
    return "50";
  }

  if (score >= 75) {
    return "30";
  }

  if (score >= 60) {
    return "20";
  }

  return "10";
}

export function hasReceivedCourseReward(
  userAddress: string,
  courseId: string
): boolean {
  const key = `${userAddress.toLowerCase()}:${courseId}`;

  return rewardedCourses.has(key);
}

export function markCourseRewarded(
  userAddress: string,
  courseId: string
): void {
  const key = `${userAddress.toLowerCase()}:${courseId}`;

  rewardedCourses.add(key);
}

export async function issueCourseReward(
  signer: ethers.Signer,
  userAddress: string,
  courseId: string,
  score: number,
  passed: boolean
) {
  if (
    hasReceivedCourseReward(
      userAddress,
      courseId
    )
  ) {
    throw new Error(
      "Reward already issued for this course"
    );
  }

  const reward = calculateCourseReward(
    score,
    passed
  );

  if (reward === "0") {
    return {
      rewarded: false,
      amount: "0",
      transactionHash: null,
      reason: "Course not passed",
    };
  }

  const result = await mintMXReward(
    signer,
    userAddress,
    reward,
    `Course completion - Course ${courseId} - Score ${score}`
  );

  markCourseRewarded(
    userAddress,
    courseId
  );

  return {
    rewarded: true,
    amount: reward,
    transactionHash: result.transactionHash,
    reason: result.reason,
  };
}