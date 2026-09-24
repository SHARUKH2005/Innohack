import "dotenv/config";
import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL
  );

  const wallet = new ethers.Wallet(
    process.env.DEPLOYER_PRIVATE_KEY!,
    provider
  );

  const balance = await provider.getBalance(wallet.address);

  console.log("\n=== Ethereum Sepolia Deployer ===");
  console.log("Wallet:", wallet.address);
  console.log("Balance:", ethers.formatEther(balance), "ETH");
  console.log("===============================\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});