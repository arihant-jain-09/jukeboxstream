import express from "express";
import { db } from "../services/dynamoDB.js";
import { GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { getSignedUrl as cloudfrontSignedUrl } from "@aws-sdk/cloudfront-signer";
import * as fs from "fs";
import https from "https";
import path from "path";
import { Blob } from "buffer";
import { client } from "../services/redis.js";
import { itemsKey } from "../utils/redis-keys.js";

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

router.get("/streams/:id", async (req, res) => {
  const musicId = req.params.id;
  const Item = await client.hget(itemsKey(musicId), "s3Name");
  // const command = new GetItemCommand({
  //   AttributesToGet: ["s3Name"],
  //   TableName: "streams",
  //   Key: {
  //     id: { S: musicId },
  //   },
  // });

  // const { Item } = await db.send(command);
  // console.log("from dynamodb");
  // console.log(Item);
  if (Item) {
    // const {
    //   s3Name: { S: s3Name },
    // } = Item;
    const s3Name = Item;
    const folderName = s3Name.substr(0, s3Name.lastIndexOf("."));
    const s3ObjectKey = `${folderName}/${folderName}.m3u8`;
    const url = `${process.env.CLOUDFRONT_DOMAIN}/${s3ObjectKey}`;
    const privateKey = fs.readFileSync(
      new URL("../private_key.pem", import.meta.url),
      {
        encoding: "utf8",
      }
    );
    const keyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID;
    const dateLessThan = new Date(new Date().getTime() + 60 * 60000);
    const m3u8Url = cloudfrontSignedUrl({
      url,
      keyPairId,
      dateLessThan,
      privateKey,
    });
    let response = {};

    function signed(url) {
      const pathInS3 = `${folderName}/${url}`;
      const tsSigned = `${process.env.CLOUDFRONT_DOMAIN}/${pathInS3}`;
      const time = new Date(new Date().getTime() + 60 * 60 * 60000);
      let signedUrl = cloudfrontSignedUrl({
        url: tsSigned,
        keyPairId,
        dateLessThan: time,
        privateKey,
      });
      // let qry = signedUrl.split("?").pop();
      // return url + "?" + qry;
      return signedUrl;
    }

    https
      .get(m3u8Url, (resp) => {
        response.status = resp.statusCode;
        let headers = {
          "content-type": [
            {
              key: "Content-Type",
              value: resp.headers["content-type"] || "text/html",
            },
          ],
          server: [
            { key: "Server", value: resp.headers["server"] || "Server" },
          ],
        };
        response.headers = headers;
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        let body = [];

        resp.on("end", () => {
          data.split("\n").forEach((elem) => {
            if (elem.startsWith("#")) {
              if (elem.indexOf("URI") != -1) {
                //URI component inline
                var uriComponents = elem
                  .substring(elem.indexOf("URI"))
                  .split('"');

                uriComponents[1] = signed(uriComponents[1]);
                body.push(
                  elem.substring(0, elem.indexOf("URI")) +
                    uriComponents.join('"')
                );
              } else {
                body.push(elem);
              }
            } else if (elem == "") {
              body.push(elem);
            } else {
              let modifiedUrl = signed(elem);
              // console.log(modifiedUrl);
              body.push(modifiedUrl);
            }
          });
          response.body = body.join("\n");
          res.send(response);
        });
      })
      .on("error", (err) => {
        res.send({
          status: "500",
          statusDescrition: "Server Error",
          headers: {
            "content-type": [{ key: "Content-Type", value: "text/plain" }],
          },
          body: "Error reading content \n\n" + err,
        });
      });
    // res.send(response);
  } else res.send({ message: "resource not found" });
});

export default router;
