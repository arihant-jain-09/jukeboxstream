import { S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = process.env.REGION;
// Create an Amazon S3 service client object.
export const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});
