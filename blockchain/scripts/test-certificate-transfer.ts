import "dotenv/config";
import { ethers } from "ethers";

import { CONTRACTS, provider } from "../services/config.js";
import { CertificateNFTABI } from "../services/abi.js";

async function main() {
  const signer = new ethers.Wallet(
    process.env.DEPLOYER_PRIVATE_KEY!,
    provider
  );

  const certificate = new ethers.Contract(
    CONTRACTS.CertificateNFT,
    CertificateNFTABI,
    signer
  );

  const from = signer.address;

  const recipient =
    "0x000000000000000000000000000000000000dEaD";

  console.log("Certificate:", CONTRACTS.CertificateNFT);
  console.log("Token ID:", 0);
  console.log("From:", from);
  console.log("To:", recipient);

  try {
    const tx = await certificate.transferFrom(
      from,
      recipient,
      0
    );

    await tx.wait();

    console.log("ERROR: Certificate transfer succeeded!");
  } catch (error) {
    console.log("\nTransfer blocked successfully.");
    console.log("Certificate is non-transferable.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});