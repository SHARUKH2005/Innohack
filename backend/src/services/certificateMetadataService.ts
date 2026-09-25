export interface CertificateMetadataInput {
  certificateId: string;
  studentName: string;
  courseName: string;
  score: number;
  completionDate: string;

  tokenId: string;
  contractAddress: string;
  blockchain: string;
  transactionHash: string;

  verificationURL: string;
  certificateURI: string;
}

export function buildCertificateMetadata(
  data: CertificateMetadataInput
) {
  return {
    name: `BlockLearnX Certificate - ${data.certificateId}`,
    description:
      "Blockchain-verified course completion certificate issued by BlockLearnX.",

    image: data.certificateURI,

    external_url: data.verificationURL,

    attributes: [
      {
        trait_type: "Student",
        value: data.studentName,
      },
      {
        trait_type: "Course",
        value: data.courseName,
      },
      {
        trait_type: "Score",
        value: data.score,
      },
      {
        trait_type: "Certificate ID",
        value: data.certificateId,
      },
      {
        trait_type: "Token ID",
        value: data.tokenId,
      },
      {
        trait_type: "Blockchain",
        value: data.blockchain,
      },
      {
        trait_type: "Contract Address",
        value: data.contractAddress,
      },
      {
        trait_type: "Transaction Hash",
        value: data.transactionHash,
      },
      {
        trait_type: "Completion Date",
        value: data.completionDate,
      },
    ],
  };
}