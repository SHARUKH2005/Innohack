import { ethers } from "ethers";
import { CONTRACTS, provider } from "./config.js";
import { MXTokenABI } from "./abi.js";

export const mxTokenContract = new ethers.Contract(
  CONTRACTS.MXToken,
  MXTokenABI,
  provider
);

export async function getMXBalance(
  walletAddress: string
): Promise<string> {
  const balance = await mxTokenContract.balanceOf(
    walletAddress
  );

  return ethers.formatEther(balance);
}

export async function getMXTotalSupply(): Promise<string> {
  const totalSupply =
    await mxTokenContract.totalSupply();

  return ethers.formatEther(totalSupply);
}

export async function getMXTokenInfo() {
  const [name, symbol, decimals] = await Promise.all([
    mxTokenContract.name(),
    mxTokenContract.symbol(),
    mxTokenContract.decimals(),
  ]);

  return {
    name,
    symbol,
    decimals: Number(decimals),
  };
}

export async function mintMXReward(
  signer: ethers.Signer,
  userAddress: string,
  amount: string,
  reason: string
) {
  const contract = mxTokenContract.connect(signer);

  const tx = await contract.mintReward(
    userAddress,
    ethers.parseEther(amount),
    reason
  );

  const receipt = await tx.wait();

  return {
    transactionHash: receipt?.hash ?? tx.hash,
    userAddress,
    amount,
    reason,
  };
}