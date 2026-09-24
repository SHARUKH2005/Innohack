import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.SEPOLIA_RPC_URL) {
  throw new Error("SEPOLIA_RPC_URL is missing");
}

if (!process.env.DEPLOYER_PRIVATE_KEY) {
  throw new Error("DEPLOYER_PRIVATE_KEY is missing");
}

export const provider = new ethers.JsonRpcProvider(
  process.env.SEPOLIA_RPC_URL
);

export const signer = new ethers.Wallet(
  process.env.DEPLOYER_PRIVATE_KEY,
  provider
);

export const MX_TOKEN_ADDRESS =
  "0xca8FD73E4EB46F7730f000baAa46Dd8A5223d3e3";

export const MX_TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address account) view returns (uint256)",
  "function mintReward(address user, uint256 amount, string reason)",
];

export const mxTokenContract = new ethers.Contract(
  MX_TOKEN_ADDRESS,
  MX_TOKEN_ABI,
  signer
);