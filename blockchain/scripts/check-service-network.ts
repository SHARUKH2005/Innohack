import "dotenv/config";
import { provider } from "../services/config.js";

async function main() {
  const network = await provider.getNetwork();

  console.log("Service RPC connected");
  console.log("Chain ID:", network.chainId.toString());
  console.log("Network:", network.name);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});