import express from "express";
import multer from "multer";
import { db } from "../services/dynamoDB.js";
import { PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import sharp from "sharp";
import { getSignedUrl as cloudfrontSignedUrl } from "@aws-sdk/cloudfront-signer";
import * as fs from "fs";
import { s3 } from "../services/s3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload/cover", upload.single("cover"), async (req, res) => {
  const file = req.file;
  const name = req.body.name;
  const fileBuffer = await sharp(file.buffer)
    .webp({ quality: 60 })
    .resize({ height: 1600, width: 1600, fit: "contain" })
    .toBuffer();
  console.log(fileBuffer);
  const fileName = `${name.substr(0, name.lastIndexOf("."))}.webp`;
  const s3Params = {
    Bucket: process.env.ASSETS_BUCKET_NAME,
    Key: fileName,
    ContentType: "image/webp",
    Body: fileBuffer,
  };
  const command = new PutObjectCommand(s3Params);
  try {
    const data = await s3.send(command);
    return data;
  } catch (error) {
    console.log(error);
  }
  res.send("true");
});
router.post("/upload/mp3", upload.single("mp3"), async (req, res) => {
  const file = req.file;
  console.log(file);
  const name = req.body.name;
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key: name,
    ContentType: file.mimetype,
    Body: file.buffer,
  };
  console.log(s3Params);
  const command = new PutObjectCommand(s3Params);
  try {
    const data = await s3.send(command);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  res.send("success");
});

router.put("/upload/details", async (req, res) => {
  const dataToQueue = {
    MessageBody: {
      id: req.body.id,
      title: req.body.title,
      s3Name: req.body.s3Name,
      artist: req.body.artist,
      genre: req.body.genre,
      // createdAt: req.body.createdAt,
    },
  };

  const response = await axios.put(
    `${process.env.API_GATEWAY}/mediaDetails`,
    dataToQueue
  );
  console.log(response);
  // const data = await db.send(
  //   new PutItemCommand({
  //     TableName: process.env.TABLE_NAME,
  //     Item: {
  //       id: req.body.id,
  //       title: req.body.title,
  //       s3Name: req.body.s3Name,
  //       artist: req.body.artist,
  //       genre: req.body.genre,
  //     },
  //   })
  // );
  // console.log(data["$metadata"]["httpStatusCode"]);
  return res.status(201).json(dataToQueue);
});
// router.put("/upload/details", async (req, res) => {
//   const data = await db.send(
//     new PutItemCommand({
//       TableName: process.env.TABLE_NAME,
//       Item: {
//         id: req.body.id,
//         title: req.body.title,
//         s3Name: req.body.s3Name,
//         artist: req.body.artist,
//         genre: req.body.genre,
//       },
//     })
//   );
//   console.log(data["$metadata"]["httpStatusCode"]);
//   return res.status(201).json(data);
// });

export default router;
