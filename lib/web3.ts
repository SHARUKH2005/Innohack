/**
 * BlockLearnX Web3 Utilities
 * Integrates with MXToken, CertificateNFT, AvatarNFT, NFTMarketplace smart contracts
 */

export const CONTRACT_ADDRESSES = {
  MXToken: process.env.NEXT_PUBLIC_MX_TOKEN_ADDRESS || "0x0000000000000000000000000000000000000000",
  CertificateNFT: process.env.NEXT_PUBLIC_CERT_NFT_ADDRESS || "0x0000000000000000000000000000000000000000",
  AvatarNFT: process.env.NEXT_PUBLIC_AVATAR_NFT_ADDRESS || "0x0000000000000000000000000000000000000000",
  NFTMarketplace: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || "0x0000000000000000000000000000000000000000",
};

// Minimal ABIs for read ops
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

const ERC721_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function name() view returns (string)",
];

const MARKETPLACE_ABI = [
  "function getListings() view returns (tuple(uint256 listingId, address seller, address nftContract, uint256 tokenId, uint256 price, bool active)[])",
  "function getListing(uint256 listingId) view returns (tuple(uint256 listingId, address seller, address nftContract, uint256 tokenId, uint256 price, bool active))",
  "function buyNFT(uint256 listingId) payable",
];

export interface WalletState {
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
}

export async function connectWallet(): Promise<string | null> {
  if (typeof window === "undefined" || !window.ethereum) {
    alert("Please install MetaMask to use Web3 features.");
    return null;
  }
  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }) as string[];
    return accounts[0] ?? null;
  } catch {
    return null;
  }
}

export async function getWalletAddress(): Promise<string | null> {
  if (typeof window === "undefined" || !window.ethereum) return null;
  try {
    const accounts = await window.ethereum.request({ method: "eth_accounts" }) as string[];
    return accounts[0] ?? null;
  } catch {
    return null;
  }
}

export async function getMXBalance(address: string): Promise<string> {
  if (!window.ethereum) return "0";
  try {
    const { ethers } = await import("ethers");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const token = new ethers.Contract(CONTRACT_ADDRESSES.MXToken, ERC20_ABI, provider);
    const decimals: number = await token.decimals();
    const raw: bigint = await token.balanceOf(address);
    return ethers.formatUnits(raw, decimals);
  } catch {
    return "0";
  }
}

export async function getCertificates(address: string): Promise<{ tokenId: string; tokenURI: string }[]> {
  if (!window.ethereum) return [];
  try {
    const { ethers } = await import("ethers");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const nft = new ethers.Contract(CONTRACT_ADDRESSES.CertificateNFT, ERC721_ABI, provider);
    const balance: bigint = await nft.balanceOf(address);
    const tokens: { tokenId: string; tokenURI: string }[] = [];
    for (let i = 0; i < Number(balance); i++) {
      const tokenId: bigint = await nft.tokenOfOwnerByIndex(address, i);
      const uri: string = await nft.tokenURI(tokenId);
      tokens.push({ tokenId: tokenId.toString(), tokenURI: uri });
    }
    return tokens;
  } catch {
    return [];
  }
}

export async function getAvatarNFTs(address: string): Promise<{ tokenId: string; tokenURI: string }[]> {
  if (!window.ethereum) return [];
  try {
    const { ethers } = await import("ethers");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const nft = new ethers.Contract(CONTRACT_ADDRESSES.AvatarNFT, ERC721_ABI, provider);
    const balance: bigint = await nft.balanceOf(address);
    const tokens: { tokenId: string; tokenURI: string }[] = [];
    for (let i = 0; i < Number(balance); i++) {
      const tokenId: bigint = await nft.tokenOfOwnerByIndex(address, i);
      const uri: string = await nft.tokenURI(tokenId);
      tokens.push({ tokenId: tokenId.toString(), tokenURI: uri });
    }
    return tokens;
  } catch {
    return [];
  }
}

export async function getMarketplaceListings() {
  if (!window.ethereum) return [];
  try {
    const { ethers } = await import("ethers");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const mp = new ethers.Contract(CONTRACT_ADDRESSES.NFTMarketplace, MARKETPLACE_ABI, provider);
    const listings = await mp.getListings();
    return listings.filter((l: { active: boolean }) => l.active);
  } catch {
    return [];
  }
}

export async function buyNFT(listingId: string | number) {
  if (!window.ethereum) throw new Error("No wallet");
  const { ethers } = await import("ethers");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const mp = new ethers.Contract(CONTRACT_ADDRESSES.NFTMarketplace, MARKETPLACE_ABI, signer);
  const tx = await mp.buyNFT(listingId);
  await tx.wait();
  return tx.hash;
}

// Extend Window type for ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, handler: (...args: unknown[]) => void) => void;
      removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
    };
  }
}
