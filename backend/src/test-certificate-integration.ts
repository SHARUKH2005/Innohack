import { issueBlockchainCertificate } from "./services/certificateIntegrationService";

async function main() {
  const result = await issueBlockchainCertificate(
    "1dda51c5-efbb-4c87-a3dd-efa3b08358f8",
    "d858746c-a48c-497b-b267-b960df7888f5",
    "ff8f92a3-d771-4a12-a0f2-434019dd7a1f",
    "BLX-CERT-TEST-001"
  );

  console.log("\nCertificate Integration Result:");
  console.dir(result, { depth: null });
}

main().catch((error) => {
  console.error("\nCertificate Integration Failed:");
  console.error(error.message);
  process.exitCode = 1;
});