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
import { SongUploadStatus } from "../utils/kafkaTopics.js";
import { kafka } from "../services/kafka.js";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function uploadLoadToS3(ObjFile, buket_name, key) {
  var params = {
    Body: ObjFile.buffer,
    Bucket: buket_name,
    ContentType: ObjFile.mimetype,
    Key: key,
  };
  const command = new PutObjectCommand(params);
  return s3.send(command);
}
const topic = SongUploadStatus();
const ProduceMsgToKafka = async (producer, isCover, isMusic) => {
  const message = {
    value: JSON.stringify({
      cover: isCover,
      music: isMusic,
    }),
  };
  await producer
    .send({
      topic,
      messages: [message],
    })
    .then(console.log)
    .catch((e) => console.error(`[example/producer] ${e.message}`, e));
};

router.post(
  "/upload/files",
  upload.fields([
    {
      name: "cover",
      maxCount: 1,
    },
    {
      name: "music",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    const producer = kafka.producer();
    const bucket_name = process.env.S3_BUCKET_NAME;
    const output_bucket = process.env.S3_OUTPUT_BUCKET_NAME;
    const dynamoDBTable = process.env.DYNAMODB_TABLE_NAME;
    const dynamoDominantColors = process.env.DYNAMODB_DOMINANT_TABLE_NAME;

    producer.on("producer.connect", () => {
      console.log(`KafkaProvider: connected`);
    });
    producer.on("producer.disconnect", () => {
      console.log(`KafkaProvider: disconnected`);
    });
    producer.on("producer.network.request_timeout", (payload) => {
      console.log(`KafkaProvider: request timeout ${payload.clientId}`);
    });
    const { cover_path, music_path, cover_name, music_name, dynamo } = req.body;
    if (req.files.cover && req.files.music) {
      try {
        await Promise.all([
          uploadLoadToS3(req.files.cover[0], bucket_name, cover_path),
          uploadLoadToS3(req.files.music[0], bucket_name, music_path),
        ]).then(async ([isCover, isMusic]) => {
          const isCoverSuccess = isCover["$metadata"].httpStatusCode === 200;
          const isMusicSuccess = isMusic["$metadata"].httpStatusCode === 200;
          await producer.connect();
          if (isCoverSuccess && isMusicSuccess) {
            await ProduceMsgToKafka(
              producer,
              {
                isCover: true,
                S3Name: cover_path,
                cover_name: cover_name,
                bucket_name,
                output_bucket,
                dynamoDBTable,
                dynamoDominantColors,
              },
              {
                isMusic: true,
                S3Name: music_path,
                music_name: music_name,
                dynamo,
                bucket_name,
                output_bucket,
                dynamoDBTable,
                dynamoDominantColors,
              }
            );
            res.send("Uploaded both");
          } else if (isCoverSuccess) {
            await ProduceMsgToKafka(
              producer,
              {
                isCover: true,
                S3Name: cover_path,
                cover_name: cover_name,
                bucket_name,
                output_bucket,
                dynamoDBTable,
                dynamoDominantColors,
              },
              { isMusic: false, dynamo }
            );
            res.send("Only Uploaded cover");
          } else if (isMusicSuccess) {
            await ProduceMsgToKafka(
              producer,
              { isCover: false },
              {
                isMusic: true,
                S3Name: music_path,
                music_name: music_name,
                dynamo,
                bucket_name,
                output_bucket,
                dynamoDBTable,
                dynamoDominantColors,
              }
            );
            res.send("Only Uploaded music");
          } else {
            await ProduceMsgToKafka(
              producer,
              { isCover: false },
              { isMusic: false, dynamo }
            );
            res.send("Failed to upload");
          }
        });
      } catch (error) {
        console.log(error);
      }
      // console.log(req.files.cover[0].originalname);
      // console.log(req.files.music[0].originalname);
    } else if (req.files.music) {
      try {
        await Promise.all([
          uploadLoadToS3(req.files.music[0], "jukeboxstream", music_path),
        ]).then(async ([isMusic]) => {
          const isMusicSuccess = isMusic["$metadata"].httpStatusCode === 200;
          await producer.connect();
          if (isMusicSuccess) {
            await ProduceMsgToKafka(
              producer,
              { isCover: false },
              {
                isMusic: true,
                S3Name: music_path,
                music_name: music_name,
                dynamo,
                bucket_name,
                output_bucket,
                dynamoDBTable,
                dynamoDominantColors,
              }
            );
            res.send("Only Uploaded music");
          } else {
            await ProduceMsgToKafka(
              producer,
              { isCover: false },
              { isMusic: false, dynamo }
            );

            res.send("Failed to upload");
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else res.send(req.files);
  }
);

router.post(
  "/upload/files/:userId",
  upload.fields([
    {
      name: "cover",
      maxCount: 1,
    },
    {
      name: "music",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    let { userId } = req.params;
    const producer = kafka.producer();
    const bucket_name = process.env.S3_USER_BUCKET_NAME;
    const output_bucket = process.env.S3_USER_OUTPUT_BUCKET_NAME;
    const dynamoDBTable = process.env.DYNAMODB_USER_TABLE_NAME;
    const dynamoDominantColors = process.env.DYNAMODB_USER_DOMINANT_TABLE_NAME;

    producer.on("producer.connect", () => {
      console.log(`KafkaProvider: connected`);
    });
    producer.on("producer.disconnect", () => {
      console.log(`KafkaProvider: disconnected`);
    });
    producer.on("producer.network.request_timeout", (payload) => {
      console.log(`KafkaProvider: request timeout ${payload.clientId}`);
    });
    let { cover_path, music_path, cover_name, music_name, dynamo } = req.body;
    cover_path = `${userId}/${cover_path}`;
    music_path = `${userId}/${music_path}`;
    if (req.files.cover && req.files.music) {
      try {
        await Promise.all([
          uploadLoadToS3(req.files.cover[0], bucket_name, cover_path),
          uploadLoadToS3(req.files.music[0], bucket_name, music_path),
        ]).then(async ([isCover, isMusic]) => {
          console.log(userId);
          const isCoverSuccess = isCover["$metadata"].httpStatusCode === 200;
          const isMusicSuccess = isMusic["$metadata"].httpStatusCode === 200;
          await producer.connect();
          if (isCoverSuccess && isMusicSuccess) {
            await ProduceMsgToKafka(
              producer,
              {
                isCover: true,
                S3Name: cover_path,
                cover_name: cover_name,
                bucket_name,
                output_bucket,
                dynamoDBTable,
                dynamoDominantColors,
                userId,
              },
              {
                isMusic: true,
                S3Name: music_path,
                music_name: music_name,
                dynamo,
                bucket_name,
                output_bucket,
                dynamoDBTable,
                dynamoDominantColors,
                userId,
              }
            );
            res.send("Uploaded both");
          } else if (isCoverSuccess) {
            await ProduceMsgToKafka(
              producer,
              {
                isCover: true,
                S3Name: cover_path,
                cover_name: cover_name,
                bucket_name,
                output_bucket,
                dynamoDBTable,
                dynamoDominantColors,
                userId,
              },
              { isMusic: false, dynamo }
            );
            res.send("Only Uploaded cover");
          } else if (isMusicSuccess) {
            await ProduceMsgToKafka(
              producer,
              { isCover: false },
              {
                isMusic: true,
                S3Name: music_path,
                music_name: music_name,
                dynamo,
                bucket_name,
                output_bucket,
                dynamoDBTable,
                dynamoDominantColors,
                userId,
              }
            );
            res.send("Only Uploaded music");
          } else {
            await ProduceMsgToKafka(
              producer,
              { isCover: false },
              { isMusic: false, dynamo }
            );
            res.send("Failed to upload");
          }
        });
      } catch (error) {
        console.log(error);
      }
      // console.log(req.files.cover[0].originalname);
      // console.log(req.files.music[0].originalname);
    } else if (req.files.music) {
      try {
        await Promise.all([
          uploadLoadToS3(req.files.music[0], "userbox", music_path),
        ]).then(async ([isMusic]) => {
          const isMusicSuccess = isMusic["$metadata"].httpStatusCode === 200;
          await producer.connect();
          if (isMusicSuccess) {
            await ProduceMsgToKafka(
              producer,
              { isCover: false },
              {
                isMusic: true,
                S3Name: music_path,
                music_name: music_name,
                dynamo,
                bucket_name,
                output_bucket,
                dynamoDBTable,
                dynamoDominantColors,
                userId,
              }
            );
            res.send("Only Uploaded music");
          } else {
            await ProduceMsgToKafka(
              producer,
              { isCover: false },
              { isMusic: false, dynamo }
            );

            res.send("Failed to upload");
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else res.send(req.files);
  }
);

// router.post("/upload/cover", upload.single("cover"), async (req, res) => {
//   const file = req.file;
//   const name = req.body.name;
//   // const fileBuffer = await sharp(file.buffer).toBuffer();
//   const s3Params = {
//     Bucket: process.env.ASSETS_BUCKET_NAME,
//     Key: name,
//     Body: file.buffer,
//   };
//   const command = new PutObjectCommand(s3Params);
//   try {
//     const data = await s3.send(command);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
//   res.send("true");
// });
// router.post("/upload/mp3", upload.single("mp3"), async (req, res) => {
//   const file = req.file;
//   console.log(file);
//   const name = req.body.name;
//   const s3Params = {
//     Bucket: process.env.BUCKET_NAME,
//     Key: name,
//     ContentType: file.mimetype,
//     Body: file.buffer,
//   };
//   console.log(s3Params);
//   const command = new PutObjectCommand(s3Params);
//   try {
//     const data = await s3.send(command);
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
//   res.send("success");
// });

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

  // const response = await axios.put(
  //   `${process.env.API_GATEWAY}/mediaDetails`,
  //   dataToQueue
  // );
  // console.log(response);
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
