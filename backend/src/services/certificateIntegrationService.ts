import { supabase } from "../config/supabase";
import { issueCertificateNFT } from "./certificateNFTService";
import { getCertificateData } from "./certificateDataService";
import { generateCertificate } from "./certificateGeneratorService";
import { generateQRCodeDataURI } from "./qrService";
import { uploadFileToIPFS, uploadJSONToIPFS } from "./ipfsService";
import { buildCertificateMetadata } from "./certificateMetadataService";

export async function issueBlockchainCertificate(
  userId: string,
  courseId: string,
  assessmentId: string,
  verificationCode: string
) {
  // Prevent duplicate certificate for the same user and course
  const { data: existingCertificate, error: checkError } =
    await supabase
      .from("certificates")
      .select("id, token_id, tx_hash")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .maybeSingle();

  if (checkError) {
    throw new Error(
      `Certificate check failed: ${checkError.message}`
    );
  }

  if (existingCertificate) {
    return {
      issued: false,
      duplicate: true,
      tokenId: existingCertificate.token_id,
      transactionHash: existingCertificate.tx_hash,
      message: "Certificate already issued for this course",
    };
  }

  // Fetch student, course and assessment details
  const certificateData = await getCertificateData(
    userId,
    courseId,
    assessmentId
  );

  if (certificateData.status !== "passed") {
    throw new Error(
      "Certificate can only be issued for a passed assessment"
    );
  }

  const frontendURL =
    process.env.FRONTEND_URL || "http://localhost:3000";

  const verificationURL =
    `${frontendURL}/verify/certificate/${encodeURIComponent(
      verificationCode
    )}`;

  const completionDate = certificateData.evaluatedAt
    ? new Date(certificateData.evaluatedAt).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  // Mint Certificate NFT on Ethereum Sepolia
  const blockchainResult = await issueCertificateNFT(
    certificateData.walletAddress,
    verificationCode
  );

  const tokenId = blockchainResult.tokenId;
  const transactionHash = blockchainResult.transactionHash;
  const contractAddress = blockchainResult.contractAddress;

  // Generate QR code for certificate verification
  const qrCodeDataURI = await generateQRCodeDataURI(
    verificationURL
  );

  /*
   * The certificate itself contains the blockchain details.
   *
   * Certificate URI is intentionally represented by the
   * verification URL here because the final IPFS CID does not
   * exist until after the certificate file is uploaded.
   */
  const certificateURI = verificationURL;

  // Generate certificate SVG
  const certificatePath = await generateCertificate({
    studentName: certificateData.studentName,
    courseName: certificateData.courseName,
    score: certificateData.score,
    certificateId: verificationCode,
    completionDate,

    tokenId,
    contractAddress,
    blockchain: "Ethereum Sepolia",
    transactionHash,

    metadataURI: "Generating...",
    certificateURI,
    verificationURL,

    qrCodeDataURI,
  });

  // Upload certificate SVG to IPFS
  const certificateCID = await uploadFileToIPFS(
    certificatePath,
    `${verificationCode}.svg`
  );

  const metadataURI = `ipfs://${certificateCID}`;

  // Build NFT metadata
  const metadata = buildCertificateMetadata({
    certificateId: verificationCode,
    studentName: certificateData.studentName,
    courseName: certificateData.courseName,
    score: certificateData.score,
    completionDate,

    tokenId,
    contractAddress,
    blockchain: "Ethereum Sepolia",
    transactionHash,

    verificationURL,
    certificateURI: `ipfs://${certificateCID}`,
  });

  // Upload metadata JSON to IPFS
  const metadataCID = await uploadJSONToIPFS(
    metadata,
    `${verificationCode}.json`
  );

  // Save NFT record
  const { error: nftError } = await supabase
    .from("nfts")
    .insert({
      user_id: userId,
      token_id: tokenId,
      contract_address: contractAddress,
      nft_type: "certificate",
      metadata_cid: metadataCID,
      image_cid: certificateCID,
      tx_hash: transactionHash,
    });

  if (nftError) {
    throw new Error(
      `Certificate minted but NFT database save failed: ${nftError.message}`
    );
  }

  // Save certificate record
  const { data: certificate, error: certificateError } =
    await supabase
      .from("certificates")
      .insert({
        user_id: userId,
        course_id: courseId,
        certificate_id: verificationCode,
        token_id: tokenId,
        metadata_cid: metadataCID,
        certificate_cid: certificateCID,
        tx_hash: transactionHash,
      })
      .select()
      .single();

  if (certificateError) {
    throw new Error(
      `NFT saved but certificate database save failed: ${certificateError.message}`
    );
  }

  return {
    issued: true,
    duplicate: false,

    studentName: certificateData.studentName,
    courseName: certificateData.courseName,
    score: certificateData.score,

    tokenId,
    transactionHash,
    contractAddress,

    metadataCID,
    certificateCID,

    verificationURL,

    certificateId: certificate.id,

    message: "Certificate NFT issued successfully",
  };
}