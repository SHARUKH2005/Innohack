import { supabase } from "./config/supabase";
import { issueBlockchainCertificate } from "./services/certificateIntegrationService";

const TEST_USER_ID =
  "1dda51c5-efbb-4c87-a3dd-efa3b08358f8";

const TEST_COURSE_ID =
  "4c2f205c-e441-422e-84b0-1531461b4a86";

const TEST_WALLET =
  "0x27A72Ada2973421aEAEC22053Dea3eF528B12f0e";

async function main() {
  console.log("\n========================================");
  console.log(" BlockLearnX Certificate E2E Test");
  console.log("========================================\n");

  // 1. Verify test user
  console.log("1. Checking test user...");

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, name, wallet_address")
    .eq("id", TEST_USER_ID)
    .single();

  if (userError || !user) {
    throw new Error(
      `Test user lookup failed: ${
        userError?.message || "User not found"
      }`
    );
  }

  console.log(`   User: ${user.name}`);
  console.log(`   Wallet: ${TEST_WALLET}`);

  // 2. Create fresh assessment
  console.log("\n2. Creating fresh assessment...");

  const { data: assessment, error: assessmentError } =
    await supabase
      .from("assessments")
      .insert({
        user_id: TEST_USER_ID,
        course_id: TEST_COURSE_ID,
        status: "passed",
        score: 92,
        feedback:
          "End-to-end blockchain certificate test assessment.",
        submitted_at: new Date().toISOString(),
        evaluated_at: new Date().toISOString(),
      })
      .select()
      .single();

  if (assessmentError || !assessment) {
    throw new Error(
      `Assessment creation failed: ${
        assessmentError?.message || "Unknown error"
      }`
    );
  }

  console.log(`   Assessment ID: ${assessment.id}`);
  console.log(`   Score: ${assessment.score}`);
  console.log(`   Status: ${assessment.status}`);

  // 3. Generate unique certificate ID
  const verificationCode =
    `BLX-E2E-${Date.now()}`;

  console.log("\n3. Certificate ID:");
  console.log(`   ${verificationCode}`);

  // 4. Full certificate blockchain flow
  console.log("\n4. Running full certificate flow...");

  const result = await issueBlockchainCertificate(
    TEST_USER_ID,
    TEST_COURSE_ID,
    assessment.id,
    verificationCode
  );

  console.log("\n5. Certificate result:");
  console.dir(result, { depth: null });

  if (!result.issued) {
    throw new Error(
      "Certificate was not issued"
    );
  }

  // 5. Verify certificate in Supabase
  console.log("\n6. Verifying certificate in database...");

  const { data: certificate, error: certificateError } =
    await supabase
      .from("certificates")
      .select("*")
      .eq("certificate_id", verificationCode)
      .single();

  if (certificateError || !certificate) {
    throw new Error(
      `Certificate verification failed: ${
        certificateError?.message ||
        "Certificate not found"
      }`
    );
  }

  // 6. Verify NFT database record
  console.log("\n7. Verifying NFT database record...");

  const { data: nft, error: nftError } =
    await supabase
      .from("nfts")
      .select("*")
      .eq("user_id", TEST_USER_ID)
      .eq("token_id", certificate.token_id)
      .single();

  if (nftError || !nft) {
    throw new Error(
      `NFT database verification failed: ${
        nftError?.message ||
        "NFT record not found"
      }`
    );
  }

  // 7. Final result
  console.log("\n========================================");
  console.log(" E2E TEST PASSED");
  console.log("========================================");

  console.log("\nAssessment:");
  console.log(`  ID      : ${assessment.id}`);
  console.log(`  Score   : ${assessment.score}`);
  console.log(`  Status  : ${assessment.status}`);

  console.log("\nBlockchain:");
  console.log(`  Token ID : ${certificate.token_id}`);
  console.log(`  TX Hash  : ${certificate.tx_hash}`);

  console.log("\nIPFS:");
  console.log(`  Metadata CID    : ${certificate.metadata_cid}`);
  console.log(`  Certificate CID : ${certificate.certificate_cid}`);

  console.log("\nVerification URL:");
  console.log(
    `  http://localhost:3000/verify/certificate/${verificationCode}`
  );

  console.log("\n========================================\n");
}

main().catch((error) => {
  console.error("\n========================================");
  console.error(" E2E TEST FAILED");
  console.error("========================================");

  console.error(
    error instanceof Error
      ? error.message
      : error
  );

  process.exitCode = 1;
});