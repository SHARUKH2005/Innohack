import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";
import FormData from "form-data";

dotenv.config();

const PINATA_JWT = process.env.PINATA_JWT;

if (!PINATA_JWT) {
  throw new Error("PINATA_JWT is missing");
}

export async function uploadFileToIPFS(
  filePath: string,
  fileName: string
): Promise<string> {
  const form = new FormData();

  form.append("file", fs.createReadStream(filePath), {
    filename: fileName,
  });

  const response = await axios.post(
    "https://uploads.pinata.cloud/v3/files",
    form,
    {
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        ...form.getHeaders(),
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    }
  );

  const cid = response.data?.data?.cid;

  if (!cid) {
    throw new Error(
      "Pinata upload succeeded but CID was not returned"
    );
  }

  return cid;
}

export async function uploadJSONToIPFS(
  data: unknown,
  fileName: string
): Promise<string> {
  const form = new FormData();

  const jsonBuffer = Buffer.from(
    JSON.stringify(data, null, 2),
    "utf-8"
  );

  form.append("file", jsonBuffer, {
    filename: fileName,
    contentType: "application/json",
  });

  const response = await axios.post(
    "https://uploads.pinata.cloud/v3/files",
    form,
    {
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        ...form.getHeaders(),
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    }
  );

  const cid = response.data?.data?.cid;

  if (!cid) {
    throw new Error(
      "Pinata JSON upload succeeded but CID was not returned"
    );
  }

  return cid;
}   