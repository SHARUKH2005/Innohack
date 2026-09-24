import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();

  console.log("\nDeploying updated CertificateNFT...\n");

  const certificateNFT = await ethers.deployContract(
    "CertificateNFT",
    [
      "https://api.blocklearnx.com/certificates/",
    ]
  );

  await certificateNFT.waitForDeployment();

  const address =
    await certificateNFT.getAddress();

  console.log("CertificateNFT deployed:");
  console.log(address);

  console.log("\nDeployment Complete");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});