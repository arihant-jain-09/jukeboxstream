import { S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const region = process.env.REACT_APP_REGION;
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY,
  },
});
export { s3Client as s3 };
