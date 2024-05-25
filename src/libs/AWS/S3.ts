import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const S3 = {
  async getPresignedUrl(key: string) {
    const client = new S3Client({ region: process.env.AWS_REGION });
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
    });

    try {
      const response = await getSignedUrl(client, command, {
        expiresIn: 3600,
      });

      return response;
    } catch (error) {
      console.log("Error getting presigned URL from S3", error);
      return error;
    }
  },

  async get(Bucket: string, Key: string) {
    const command = new GetObjectCommand({ Bucket, Key });
    const client = new S3Client({ region: process.env.AWS_REGION });

    const { Body, ContentType } = await client.send(command);
    return { Body, Key, ContentType };
  },
};
