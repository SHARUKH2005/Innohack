import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("=================================================");
  console.log("🚀 Starting BlockLearnX Smart Contract Deployment");
  console.log("=================================================");

  const [deployer] = await ethers.getSigners();
  console.log(`Deployer Address: ${deployer.address}`);
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Deployer Balance: ${ethers.formatEther(balance)} ETH\n`);

  // 1. Deploy MXToken (ERC-20 Reward Token)
  console.log("1. Deploying MXToken...");
  const MXTokenFactory = await ethers.getContractFactory("MXToken");
  const initialSupply = 1000000; // 1,000,000 MX tokens
  const mxToken = await MXTokenFactory.deploy(initialSupply);
  await mxToken.waitForDeployment();
  const mxTokenAddress = await mxToken.getAddress();
  console.log(`✅ MXToken deployed at: ${mxTokenAddress}`);

  // 2. Deploy CertificateNFT (Soulbound ERC-721 Certificate)
  console.log("\n2. Deploying CertificateNFT (Soulbound)...");
  const CertificateFactory = await ethers.getContractFactory("CertificateNFT");
  const certificateNFT = await CertificateFactory.deploy();
  await certificateNFT.waitForDeployment();
  const certificateAddress = await certificateNFT.getAddress();
  console.log(`✅ CertificateNFT deployed at: ${certificateAddress}`);

  // 3. Deploy CourseRegistry (Course Publishing & Escrow)
  console.log("\n3. Deploying CourseRegistry...");
  const RegistryFactory = await ethers.getContractFactory("CourseRegistry");
  const courseRegistry = await RegistryFactory.deploy();
  await courseRegistry.waitForDeployment();
  const registryAddress = await courseRegistry.getAddress();
  console.log(`✅ CourseRegistry deployed at: ${registryAddress}`);

  // Authorize registry / deployer to mint rewards on MXToken
  await mxToken.setMinter(registryAddress, true);
  console.log(`\n🔗 Authorized CourseRegistry to mint MX token rewards.`);

  // Save deployed contract addresses & ABIs for Frontend & Backend integration
  const deploymentInfo = {
    network: "hardhat-local / testnet",
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      MXToken: {
        address: mxTokenAddress,
        symbol: "MX",
        decimals: 18,
      },
      CertificateNFT: {
        address: certificateAddress,
        symbol: "BLX-CERT",
        type: "Soulbound ERC-721",
      },
      CourseRegistry: {
        address: registryAddress,
        type: "Escrow & Registry",
      },
    },
  };

  const outputDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, "deployed-contracts.json");
  fs.writeFileSync(outputPath, JSON.stringify(deploymentInfo, null, 2));
  console.log(`\n📄 Deployment metadata saved to: ${outputPath}`);

  console.log("\n=================================================");
  console.log("🎉 ALL SMART CONTRACTS SUCCESSFULLY DEPLOYED!");
  console.log("=================================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
