import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BUCKET = process.env.S3_BUCKET;
const REGION = process.env.REGION;

export const S3 = {
  async getPresignedUrl(key: string) {
    const client = new S3Client({ region: REGION });
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
    });

    const response = await getSignedUrl(client, command, {
      expiresIn: 3600,
    });

    return response;
  },

  async getPresignedUrlGet(key: string) {
    const client = new S3Client({ region: REGION });
    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    });

    const response = await getSignedUrl(client, command, {
      expiresIn: 3600,
    });

    return response;
  },

  async get(Key: string) {
    const command = new GetObjectCommand({ Bucket: BUCKET, Key });
    const client = new S3Client({ region: REGION });

    const { Body, ContentType } = await client.send(command);
    return { Body, Key, ContentType };
  },
};
