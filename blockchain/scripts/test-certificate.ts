import "dotenv/config";
import { ethers } from "ethers";

import {
  issueCertificateNFT,
  getCertificateNFTInfo,
} from "../services/certificates.js";

async function main() {
  const provider = new ethers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL
  );

  const signer = new ethers.Wallet(
    process.env.DEPLOYER_PRIVATE_KEY!,
    provider
  );

  const studentAddress = signer.address;

  const verificationCode =
    "BLX-CERT-SEP-2026-001";

  console.log("Student:", studentAddress);
  console.log(
    "Verification Code:",
    verificationCode
  );

  const result = await issueCertificateNFT(
    signer,
    studentAddress,
    verificationCode
  );

  console.log("\nCertificate Minted:");
  console.log("Token ID:", result.tokenId);
  console.log(
    "Transaction Hash:",
    result.transactionHash
  );

  const certificate =
    await getCertificateNFTInfo(
      BigInt(result.tokenId)
    );

  console.log("\nOn-chain Certificate:");
  console.log(certificate);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
