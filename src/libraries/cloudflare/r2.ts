import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

// https://developers.cloudflare.com/r2/examples/authenticate-r2-auth-tokens/
export const r2Client = new S3Client({
  endpoint: `https://${process.env.CLOUDFARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: "auto", // Cloudflare R2 doesn't use regions, but this is required by the SDK
  credentials: {
    accessKeyId: process.env.CLOUDFARE_R2_ACCESS_ID,
    secretAccessKey: process.env.CLOUDFARE_R2_SECRET_KEY,
    // secretAccessKey: hashedSecretKey,
  },
});

export const getObjects = async (Bucket: string) => {
  const result = await r2Client.send(
    new ListObjectsCommand({
      Bucket,
    }),
  );

  return result;
};

export const getObject = async (Bucket: string, Key: string) => {
  const result = await r2Client.send(
    new GetObjectCommand({
      Bucket,
      Key,
    }),
  );

  return result;
};

export const putObject = async (Bucket: string, Key: string, Body: Buffer, ContentType: string) => {
  const result = await r2Client.send(
    new PutObjectCommand({
      Bucket,
      Key,
      Body,
      ContentType,
    }),
  );

  return result;
};

export const deleteObject = async (Bucket: string, Key: string) => {
  const result = await r2Client.send(
    new DeleteObjectCommand({
      Bucket,
      Key,
    }),
  );

  return result;
};
