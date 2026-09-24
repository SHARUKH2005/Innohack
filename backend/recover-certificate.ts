import "dotenv/config";
import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL
  );

  const contract = new ethers.Contract(
    "0x4573664Fb1a4caB09e870d5A6af3afEcFcCD3eC1",
    [
      "event CertificateIssued(address indexed student,uint256 indexed tokenId,string verificationCode)"
    ],
    provider
  );

  const student =
    "0x27A72Ada2973421aEAEC22053Dea3eF528B12f0e";

  const currentBlock = await provider.getBlockNumber();

  console.log("Current block:", currentBlock);

  const startBlock = Math.max(0, currentBlock - 10000);

  for (let start = startBlock; start <= currentBlock; start += 10) {
    const end = Math.min(start + 9, currentBlock);

    try {
      const filter = contract.filters.CertificateIssued(student);

      const logs = await contract.queryFilter(
        filter,
        start,
        end
      );

      if (logs.length > 0) {
        for (const log of logs) {
          console.log("\nFOUND CERTIFICATE");
          console.log("Block:", log.blockNumber);
          console.log("Transaction:", log.transactionHash);
          console.log("Token ID:", log.args?.tokenId?.toString());
          console.log("Student:", log.args?.student);
          console.log("Verification Code:", log.args?.verificationCode);
        }

        return;
      }
    } catch {
      // Continue with next 10-block range
    }
  }

  console.log("\nCertificate not found.");
}

main().catch(console.error);