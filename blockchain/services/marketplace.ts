import { ethers } from "ethers";
import { CONTRACTS, provider } from "./config.js";
import { NFTMarketplaceABI } from "./abi.js";

export const marketplaceContract = new ethers.Contract(
  CONTRACTS.NFTMarketplace,
  NFTMarketplaceABI,
  provider
);

export async function getListing(
  listingId: bigint
) {
  const listing =
    await marketplaceContract.getListing(listingId);

  return {
    listingId: listing.listingId.toString(),
    seller: listing.seller,
    nftContract: listing.nftContract,
    tokenId: listing.tokenId.toString(),
    price: ethers.formatEther(listing.price),
    active: listing.active,
  };
}

export async function getMarketplacePaymentToken(): Promise<string> {
  return await marketplaceContract.paymentToken();
}