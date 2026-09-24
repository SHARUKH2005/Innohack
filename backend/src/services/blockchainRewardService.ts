import { ethers } from "ethers";
import {
  mxTokenContract,
  signer
} from "../config/blockchain";

export async function mintMXReward(
  userAddress: string,
  amount: string,
  reason: string
) {
  if (!ethers.isAddress(userAddress)) {
    throw new Error("Invalid wallet address");
  }

  if (Number(amount) <= 0) {
    throw new Error("Reward amount must be greater than zero");
  }

  const amountInWei = ethers.parseEther(amount);

  const tx = await mxTokenContract.mintReward(
    userAddress,
    amountInWei,
    reason
  );

  const receipt = await tx.wait();

  return {
    transactionHash: receipt?.hash ?? tx.hash,
    userAddress,
    amount,
    reason
  };
}

export async function getBackendWalletAddress(): Promise<string> {
  return await signer.getAddress();
}