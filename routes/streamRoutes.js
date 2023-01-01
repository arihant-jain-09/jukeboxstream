import express from "express";
import { db } from "../services/dynamoDB.js";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { getSignedUrl as cloudfrontSignedUrl } from "@aws-sdk/cloudfront-signer";
import * as fs from "fs";

const router = express.Router();

router.get("/streams/all", async (req, res) => {
  const command = new ScanCommand({
    TableName: "streams",
    Select: "ALL_ATTRIBUTES",
  });
  const { Items: images } = await db.send(command);
  for (let image of images) {
    console.log(image);
    image.s3Name = image.s3Name.S;
    const folderName = image.s3Name.substr(0, image.s3Name.lastIndexOf("."));
    const s3ObjectKey = `${folderName}/${image.s3Name}`;
    const url = `${process.env.CLOUDFRONT_DOMAIN}/${s3ObjectKey}`;
    const privateKey = fs.readFileSync(
      new URL("../private_key.pem", import.meta.url),
      {
        encoding: "utf8",
      }
    );
    const keyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID;
    const dateLessThan = new Date(new Date().getTime() + 60 * 60000);
    image.cover = cloudfrontSignedUrl({
      url,
      keyPairId,
      dateLessThan,
      privateKey,
    });
    console.log(`${folderName}/${image.s3Name}`);
  }
  res.send(images);
});

export default router;
