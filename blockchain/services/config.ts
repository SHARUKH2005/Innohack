import "dotenv/config";
import { ethers } from "ethers";

export const RPC_URL =
  process.env.SEPOLIA_RPC_URL || "";

export const CHAIN_ID = 11155111;

export const provider = new ethers.JsonRpcProvider(
  RPC_URL
);

export const CONTRACTS = {
  MXToken: "0xca8FD73E4EB46F7730f000baAa46Dd8A5223d3e3",
  AvatarNFT: "0xef26C1650a19b74e837917d683a1C17C41e8863b",
  CertificateNFT: "0x4573664Fb1a4caB09e870d5A6af3afEcFcCD3eC1",
  NFTMarketplace: "0x3FDbba1a31056555FD042F64df08074B9dc6F1b2"
} as const;