import { Router } from "express";
import { supabase } from "../config/supabase";

const router = Router();

// GET /api/marketplace - returns all NFTs + certificates as marketplace listings
router.get("/", async (req, res) => {
  try {
    const [nftsRes, certsRes, usersRes] = await Promise.all([
      supabase
        .from("nfts")
        .select("*, users(name, wallet_address)")
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("certificates")
        .select("*, courses(title, description), users(name, wallet_address)")
        .order("issued_at", { ascending: false })
        .limit(50),
      supabase.from("users").select("id, name, wallet_address, role").limit(20),
    ]);

    const nfts = (nftsRes.data || []).map((nft: any) => ({
      id: `nft-${nft.id}`,
      type: "nft",
      tokenId: nft.token_id,
      title: nft.nft_type === "certificate" ? "Soulbound Certificate NFT" : nft.nft_type || "BlockLearnX NFT",
      description: `On-chain NFT credential minted on Ethereum Sepolia. Token #${nft.token_id || nft.id}`,
      owner: nft.users?.name || "Anonymous Learner",
      ownerWallet: nft.users?.wallet_address || "0x0000...0000",
      price: null,
      priceUSD: null,
      network: "Ethereum Sepolia",
      standard: "ERC-5192",
      contractAddress: "0x4573664Fb1a4caB09e870d5A6af3afEcFcCD3eC1",
      mintedAt: nft.created_at || nft.minted_at,
      verified: true,
      category: "credential",
      rawId: nft.id,
    }));

    const certs = (certsRes.data || []).map((cert: any) => ({
      id: `cert-${cert.id}`,
      type: "certificate",
      tokenId: cert.token_id,
      certificateId: cert.certificate_id,
      title: cert.courses?.title ? `${cert.courses.title} — Certificate` : "BlockLearnX Verified Certificate",
      description: cert.courses?.description || "Blockchain-verified course completion certificate issued by BlockLearnX.",
      owner: cert.users?.name || "Anonymous Learner",
      ownerWallet: cert.users?.wallet_address || "0x0000...0000",
      price: null,
      priceUSD: null,
      network: "Ethereum Sepolia",
      standard: "ERC-5192 Soulbound",
      contractAddress: "0x4573664Fb1a4caB09e870d5A6af3afEcFcCD3eC1",
      txHash: cert.tx_hash,
      mintedAt: cert.issued_at,
      verified: true,
      category: "certificate",
      rawId: cert.id,
      courseName: cert.courses?.title || null,
    }));

    return res.json({
      listings: [...certs, ...nfts],
      stats: {
        totalNFTs: nftsRes.data?.length || 0,
        totalCertificates: certsRes.data?.length || 0,
        totalUsers: usersRes.data?.length || 0,
      },
    });
  } catch (error) {
    console.error("Marketplace fetch error:", error);
    return res.status(500).json({ error: "Failed to fetch marketplace data" });
  }
});

// GET /api/marketplace/stats
router.get("/stats", async (req, res) => {
  try {
    const [nftCount, certCount, userCount] = await Promise.all([
      supabase.from("nfts").select("id", { count: "exact", head: true }),
      supabase.from("certificates").select("id", { count: "exact", head: true }),
      supabase.from("users").select("id", { count: "exact", head: true }),
    ]);

    return res.json({
      totalNFTs: nftCount.count || 0,
      totalCertificates: certCount.count || 0,
      totalUsers: userCount.count || 0,
      floorPrice: "Free",
      volume: "On-Chain",
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
