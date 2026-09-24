
import { ethers } from "ethers";
import { CONTRACTS, provider } from "./config.js";
import { AvatarNFTABI } from "./abi.js";

export const avatarNFTContract = new ethers.Contract(
  CONTRACTS.AvatarNFT,
  AvatarNFTABI,
  provider
);

export async function getAchievementOwner(
  tokenId: bigint
): Promise<string> {
  return await avatarNFTContract.ownerOf(tokenId);
}

export async function getAchievementURI(
  tokenId: bigint
): Promise<string> {
  return await avatarNFTContract.tokenURI(tokenId);
}

export async function getAchievementNFTInfo(
  tokenId: bigint
) {
  const [owner, tokenURI] = await Promise.all([
    avatarNFTContract.ownerOf(tokenId),
    avatarNFTContract.tokenURI(tokenId),
  ]);

  return {
    tokenId: tokenId.toString(),
    owner,
    tokenURI,
  };
}