import { supabase } from "../config/supabase";
import { mintMXReward } from "./blockchainRewardService";
import { calculateMXReward } from "./rewardService";

export async function issueAssessmentReward(
  assessmentId: string,
  userId: string,
  courseId: string,
  walletAddress: string,
  score: number,
  passed: boolean
) {
  // Check whether this course already received a reward
  const { data: existingReward, error: checkError } = await supabase
    .from("rewards")
    .select("id, tx_hash, amount")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .maybeSingle();

  if (checkError) {
    throw new Error(
      `Reward check failed: ${checkError.message}`
    );
  }

  if (existingReward) {
    return {
      rewarded: false,
      duplicate: true,
      amount: existingReward.amount,
      transactionHash: existingReward.tx_hash,
      message: "Reward already issued for this course"
    };
  }

  const amount = calculateMXReward(score, passed);

  if (amount === "0") {
    return {
      rewarded: false,
      duplicate: false,
      amount: "0",
      transactionHash: null,
      message: "Course not passed"
    };
  }

  // Mint MX tokens on Ethereum Sepolia
  const blockchainResult = await mintMXReward(
    walletAddress,
    amount,
    `Course completion - Course ${courseId} - Score ${score}`
  );

  // Store blockchain transaction in Supabase
  const { data: rewardRecord, error: insertError } = await supabase
    .from("rewards")
    .insert({
      user_id: userId,
      course_id: courseId,
      amount,
      reason: blockchainResult.reason,
      tx_hash: blockchainResult.transactionHash
    })
    .select()
    .single();

  if (insertError) {
    throw new Error(
      `Reward minted but database save failed: ${insertError.message}`
    );
  }

  return {
    rewarded: true,
    duplicate: false,
    amount,
    transactionHash: blockchainResult.transactionHash,
    rewardId: rewardRecord.id,
    message: "MX reward issued successfully"
  };
}