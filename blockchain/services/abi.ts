import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadABI(
  contractFolder: string,
  contractName: string
) {
  const artifactPath = path.resolve(
    __dirname,
    "..",
    "artifacts",
    "contracts",
    contractFolder,
    `${contractName}.json`
  );

  const artifact = JSON.parse(
    readFileSync(artifactPath, "utf-8")
  );

  return artifact.abi;
}

export const MXTokenABI = loadABI(
  "MXToken.sol",
  "MXToken"
);

export const AvatarNFTABI = loadABI(
  "AvatarNFT.sol",
  "AvatarNFT"
);

export const CertificateNFTABI = loadABI(
  "CertificateNFT.sol",
  "CertificateNFT"
);

export const NFTMarketplaceABI = loadABI(
  "NFTMarketplace.sol",
  "NFTMarketplace"
);