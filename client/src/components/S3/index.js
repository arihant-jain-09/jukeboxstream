import s3Client from "aws-sdk/clients/s3";

export const s3 = new s3Client({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_KEY,
  region: process.env.REACT_APP_REGION,
  signatureVersion: "v4",
});
