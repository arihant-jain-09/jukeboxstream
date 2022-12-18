import express from "express";
import { db } from "../services/dynamoDB.js";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../services/s3.js";

const router = express.Router();

router.get("/streams/all", async (req, res) => {
  const command = new ScanCommand({
    TableName: "streams",
    Select: "ALL_ATTRIBUTES",
  });
  const { Items: images } = await db.send(command);
  for (let image of images) {
    image.title = image.title.S;
    const folderName = image.title.substr(0, image.title.lastIndexOf("."));
    image.cover = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `${folderName}/${image.title}`,
      }),
      { expiresIn: 60 * 60 } // 1 hour
    );
    console.log(`${folderName}/${image.title}`);
  }
  res.send(images);
});

export default router;
