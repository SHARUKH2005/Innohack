import { ethers } from "ethers";
import {
  signer
} from "../config/blockchain";

const CERTIFICATE_NFT_ADDRESS =
  "0x4573664Fb1a4caB09e870d5A6af3afEcFcCD3eC1";

const CERTIFICATE_NFT_ABI = [
  "function issueCertificate(address student, string code) returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function verificationCode(uint256 tokenId) view returns (string)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "event CertificateIssued(address indexed student, uint256 indexed tokenId, string verificationCode)"
];

const certificateNFT = new ethers.Contract(
  CERTIFICATE_NFT_ADDRESS,
  CERTIFICATE_NFT_ABI,
  signer
);

export async function issueCertificateNFT(
  studentAddress: string,
  verificationCode: string
) {
  if (!ethers.isAddress(studentAddress)) {
    throw new Error("Invalid student wallet address");
  }

  if (!verificationCode.trim()) {
    throw new Error("Verification code is required");
  }

  const tx = await certificateNFT.issueCertificate(
    studentAddress,
    verificationCode
  );

  const receipt = await tx.wait();

  if (!receipt) {
    throw new Error(
      "Certificate transaction receipt not found"
    );
  }

  let tokenId: string | null = null;

  for (const log of receipt.logs) {
    try {
      const parsed = certificateNFT.interface.parseLog(log);

      if (parsed?.name === "CertificateIssued") {
        tokenId = parsed.args.tokenId.toString();
        break;
      }
    } catch {
      // Ignore logs from other contracts
    }
  }

  if (tokenId === null) {
    throw new Error(
      "CertificateIssued event not found"
    );
  }

  return {
    tokenId,
    transactionHash: receipt.hash,
    studentAddress,
    verificationCode,
    contractAddress: CERTIFICATE_NFT_ADDRESS
  };
}