import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BUCKET = process.env.S3_BUCKET;
const BUCKET_PHOTOS = process.env.S3_BUCKET_PROFILE_PHOTOS;
const REGION = process.env.REGION;

export const S3 = {
  async getPresignedUrl(key: string, profilePhoto?: boolean) {
    const client = new S3Client({ region: REGION });
    const bucketToUse = profilePhoto ? BUCKET_PHOTOS : BUCKET;
    const command = new PutObjectCommand({
      Bucket: bucketToUse,
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

  async delete(Key: string) {
    const command = new DeleteObjectCommand({ Bucket: BUCKET, Key });
    const client = new S3Client({ region: REGION });

    await client.send(command);
  },
};
