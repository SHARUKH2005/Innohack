import fs from "fs/promises";
import path from "path";

interface CertificateData {
  studentName: string;
  courseName: string;
  score: number;
  certificateId: string;
  completionDate: string;

  tokenId: string;
  contractAddress: string;
  blockchain: string;
  transactionHash: string;

  metadataURI: string;
  certificateURI: string;
  verificationURL: string;

  qrCodeDataURI?: string;
}

export async function generateCertificate(
  data: CertificateData
): Promise<string> {
  const templatePath = path.join(
    process.cwd(),
    "templates",
    "certificate.svg"
  );

  let svg = await fs.readFile(templatePath, "utf-8");

  const replacements: Record<string, string> = {
    "{STUDENT_NAME}": escapeXml(data.studentName),
    "{COURSE_NAME}": escapeXml(data.courseName),
    "{SCORE}": String(data.score),
    "{CERTIFICATE_ID}": escapeXml(data.certificateId),
    "{COMPLETION_DATE}": escapeXml(data.completionDate),

    "{TOKEN_ID}": escapeXml(data.tokenId),
    "{CONTRACT_ADDRESS}": escapeXml(data.contractAddress),
    "{BLOCKCHAIN}": escapeXml(data.blockchain),
    "{TRANSACTION_HASH}": escapeXml(data.transactionHash),

    "{METADATA_URI}": escapeXml(data.metadataURI),
    "{CERTIFICATE_URI}": escapeXml(data.certificateURI),
    "{VERIFICATION_URL}": escapeXml(data.verificationURL),

    "{QR_CODE}": data.qrCodeDataURI ?? "",
  };

  for (const [placeholder, value] of Object.entries(replacements)) {
    svg = svg.split(placeholder).join(value);
  }

  const outputDirectory = path.join(
    process.cwd(),
    "generated",
    "certificates"
  );

  await fs.mkdir(outputDirectory, {
    recursive: true,
  });

  const safeCertificateId = data.certificateId.replace(
    /[^a-zA-Z0-9-_]/g,
    "_"
  );

  const outputPath = path.join(
    outputDirectory,
    `${safeCertificateId}.svg`
  );

  await fs.writeFile(outputPath, svg, "utf-8");

  return outputPath;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}