import QRCode from "qrcode";

export async function generateQRCodeDataURI(
  verificationURL: string
): Promise<string> {
  if (!verificationURL.trim()) {
    throw new Error("Verification URL is required");
  }

  return await QRCode.toDataURL(verificationURL, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 300,
  });
}