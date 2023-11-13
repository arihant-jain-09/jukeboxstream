import express from 'express';
import { db } from '../services/dynamoDB.js';
import { GetItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { getSignedUrl as cloudfrontSignedUrl } from '@aws-sdk/cloudfront-signer';
import * as fs from 'fs';
import https from 'https';
import path from 'path';
import { client } from '../services/redis.js';
import { itemsKey, userItemsKey } from '../utils/redis-keys.js';
import {
  CognitoIdentityProviderClient,
  // GetUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const router = express.Router();
const cognito = new CognitoIdentityProviderClient();

// const getCognitoUserId = async (req, res, next) => {
//   const token = req.headers.authorization; // Assuming the token is sent in the 'Authorization' header
//   const params = {
//     AccessToken: token,
//   };
//   try {
//     const command = new GetUserCommand(params);
//     const response = await cognito.send(command);
//     console.log(response);
//     // req.cognitoUserId = Username; // Store the Cognito user ID in the request object for later use
//     next();
//   } catch (error) {
//     // Handle error (e.g., invalid token)
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

// router.get("/streams", async (req, res) => {
//   res.send("success");
// });

router.post('/streams/all', async (req, res) => {
  // console.log(req.Username);
  const { userId } = req.body;
  const command = new ScanCommand({
    TableName: process.env.DYNAMODB_USER_TABLE_NAME,
    Select: 'ALL_ATTRIBUTES',
    FilterExpression: 'userId = :userID',
    ExpressionAttributeValues: {
      ':userID': { S: userId }, // Replace "your_userID" with the specific userID you want to query
    },
  });
  const { Items: items } = await db.send(command);
  for (let item of items) {
    console.log(item);
    const name = item.name.S;
    const s3ObjectKey = `${userId}/${name}/images/default/${name}.webp`;
    const url = `${process.env.CLOUDFRONT_USER_DOMAIN}/${s3ObjectKey}`;
    const privateKey = fs.readFileSync(
      new URL('../private_key.pem', import.meta.url),
      {
        encoding: 'utf8',
      }
    );
    const keyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID;
    const dateLessThan = new Date(new Date().getTime() + 60 * 60000);
    item.cover = cloudfrontSignedUrl({
      url,
      keyPairId,
      dateLessThan,
      privateKey,
    });
    console.log(s3ObjectKey);
  }
  res.send(items);
});

router.get('/streams/all', async (req, res) => {
  const command = new ScanCommand({
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Select: 'ALL_ATTRIBUTES',
  });
  const { Items: items } = await db.send(command);
  for (let item of items) {
    console.log(item);
    const name = item.name.S;
    let now = new Date(item.timestamp.S);
    item.timestamp.S = now.getTime();
    const s3ObjectKey = `${name}/images/default/${name}.webp`;
    const url = `${process.env.CLOUDFRONT_DOMAIN}/${s3ObjectKey}`;
    const privateKey = fs.readFileSync(
      new URL('../private_key.pem', import.meta.url),
      {
        encoding: 'utf8',
      }
    );
    const keyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID;
    const dateLessThan = new Date(new Date().getTime() + 60 * 60000);
    item.cover = cloudfrontSignedUrl({
      url,
      keyPairId,
      dateLessThan,
      privateKey,
    });
    console.log(s3ObjectKey);
  }
  res.send(items);
});

router.get('/streams/:id', async (req, res) => {
  const artist_timestamp = req.params.id;
  const userId = req.query.userId;
  const cloudfrontDomain = userId
    ? process.env.CLOUDFRONT_USER_DOMAIN
    : process.env.CLOUDFRONT_DOMAIN;
  console.log('redis key', userId + '#' + artist_timestamp);
  console.log('cloudfrontDomain: ' + cloudfrontDomain);
  const Item = await client.hget(
    userId
      ? userItemsKey(userId, artist_timestamp)
      : itemsKey(artist_timestamp),
    'name'
  );
  // const command = new GetItemCommand({
  //   AttributesToGet: ["name"],
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
    //   name: { S: name },
    // } = Item;
    const name = Item;
    // const name = name.substr(0, name.lastIndexOf("."));
    const s3ObjectKey = userId
      ? `${userId}/${name}/${name}.m3u8`
      : `${name}/${name}.m3u8`;
    console.log(s3ObjectKey);
    const url = `${cloudfrontDomain}/${s3ObjectKey}`;
    const privateKey = fs.readFileSync(
      new URL('../private_key.pem', import.meta.url),
      {
        encoding: 'utf8',
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
    console.log(m3u8Url);
    let response = {};

    function signed(url) {
      const pathInS3 = userId ? `${userId}/${name}/${url}` : `${name}/${url}`;
      const tsSigned = `${cloudfrontDomain}/${pathInS3}`;
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
          'content-type': [
            {
              key: 'Content-Type',
              value: resp.headers['content-type'] || 'text/html',
            },
          ],
          server: [
            { key: 'Server', value: resp.headers['server'] || 'Server' },
          ],
        };
        response.headers = headers;
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });

        let body = [];

        resp.on('end', () => {
          data.split('\n').forEach((elem) => {
            if (elem.startsWith('#')) {
              if (elem.indexOf('URI') != -1) {
                //URI component inline
                var uriComponents = elem
                  .substring(elem.indexOf('URI'))
                  .split('"');

                uriComponents[1] = signed(uriComponents[1]);
                body.push(
                  elem.substring(0, elem.indexOf('URI')) +
                    uriComponents.join('"')
                );
              } else {
                body.push(elem);
              }
            } else if (elem == '') {
              body.push(elem);
            } else {
              let modifiedUrl = signed(elem);
              // console.log(modifiedUrl);
              body.push(modifiedUrl);
            }
          });
          response.body = body.join('\n');
          res.send(response);
        });
      })
      .on('error', (err) => {
        res.send({
          status: '500',
          statusDescrition: 'Server Error',
          headers: {
            'content-type': [{ key: 'Content-Type', value: 'text/plain' }],
          },
          body: 'Error reading content \n\n' + err,
        });
      });
    // res.send(response);
  } else res.send({ message: 'resource not found' });
});

export default router;
