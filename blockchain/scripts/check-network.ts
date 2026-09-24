import "dotenv/config";
import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL
  );

  const network = await provider.getNetwork();

  console.log("Connected to Base Sepolia");
  console.log("Chain ID:", network.chainId.toString());
  console.log("Network Name:", network.name);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});