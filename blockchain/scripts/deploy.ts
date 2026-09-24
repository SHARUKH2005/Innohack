import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();

  console.log("\n🚀 Deploying BlockLearnX contracts...\n");

  // 1. Deploy MX Token
  const mxToken = await ethers.deployContract("MXToken");
  await mxToken.waitForDeployment();

  const mxTokenAddress = await mxToken.getAddress();

  console.log("MXToken:");
  console.log(mxTokenAddress);

  // 2. Deploy Avatar NFT
  const avatarNFT = await ethers.deployContract("AvatarNFT", [
    "https://api.blocklearnx.com/achievements/",
  ]);
  await avatarNFT.waitForDeployment();

  const avatarNFTAddress = await avatarNFT.getAddress();

  console.log("\nAvatarNFT:");
  console.log(avatarNFTAddress);

  // 3. Deploy Certificate NFT
  const certificateNFT = await ethers.deployContract(
    "CertificateNFT",
    [
      "https://api.blocklearnx.com/certificates/",
    ]
  );
  await certificateNFT.waitForDeployment();

  const certificateNFTAddress =
    await certificateNFT.getAddress();

  console.log("\nCertificateNFT:");
  console.log(certificateNFTAddress);

  // 4. Deploy Marketplace
  const marketplace = await ethers.deployContract(
    "NFTMarketplace",
    [mxTokenAddress]
  );
  await marketplace.waitForDeployment();

  const marketplaceAddress =
    await marketplace.getAddress();

  console.log("\nNFTMarketplace:");
  console.log(marketplaceAddress);

  console.log("\n================================");
  console.log("BlockLearnX Deployment Complete");
  console.log("================================\n");

  console.log("MXToken          :", mxTokenAddress);
  console.log("AvatarNFT        :", avatarNFTAddress);
  console.log("CertificateNFT   :", certificateNFTAddress);
  console.log("NFTMarketplace   :", marketplaceAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});