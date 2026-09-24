import { ethers } from "ethers";
import { CONTRACTS, provider } from "./config.js";
import { CertificateNFTABI } from "./abi.js";

export const certificateNFTContract =
  new ethers.Contract(
    CONTRACTS.CertificateNFT,
    CertificateNFTABI,
    provider
  );

export async function getCertificateOwner(
  tokenId: bigint
): Promise<string> {
  return await certificateNFTContract.ownerOf(tokenId);
}

export async function getCertificateVerificationCode(
  tokenId: bigint
): Promise<string> {
  return await certificateNFTContract.verificationCode(
    tokenId
  );
}

export async function getCertificateURI(
  tokenId: bigint
): Promise<string> {
  return await certificateNFTContract.tokenURI(
    tokenId
  );
}

export async function getCertificateNFTInfo(
  tokenId: bigint
) {
  const [owner, verificationCode, tokenURI] =
    await Promise.all([
      certificateNFTContract.ownerOf(tokenId),
      certificateNFTContract.verificationCode(tokenId),
      certificateNFTContract.tokenURI(tokenId),
    ]);

  return {
    tokenId: tokenId.toString(),
    owner,
    verificationCode,
    tokenURI,
  };
}

export async function issueCertificateNFT(
  signer: ethers.Signer,
  studentAddress: string,
  verificationCode: string
) {
  const contract =
    certificateNFTContract.connect(signer);

  const tx = await contract.issueCertificate(
    studentAddress,
    verificationCode
  );

  const receipt = await tx.wait();

  if (!receipt) {
    throw new Error(
      "Certificate transaction receipt not found"
    );
  }

  const event = receipt.logs
    .map((log) => {
      try {
        return contract.interface.parseLog(log);
      } catch {
        return null;
      }
    })
    .find(
      (parsed) =>
        parsed?.name === "CertificateIssued"
    );

  if (!event) {
    throw new Error(
      "CertificateIssued event not found"
    );
  }

  const tokenId =
    event.args.tokenId.toString();

  return {
    tokenId,
    transactionHash: receipt.hash,
    studentAddress,
    verificationCode,
  };
}