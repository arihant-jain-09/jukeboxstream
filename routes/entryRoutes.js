import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/client-dynamodb";

import { isEmpty } from "lodash";

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
  region: process.env.REGION,
});

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { Item } = await client.send(
      new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
          id: req.body.id,
          title: req.body.title,
          s3Name: req.body.s3Name,
          artist: req.body.artist,
          genre: req.body.genre,
        },
      })
    );

    return res.status(201).json(Item);
  }

  if (req.method === "GET") {
    if (!isEmpty(req.query)) {
      const { Item } = await client.send(
        new GetItemCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            id: { S: req.query.id },
          },
        })
      );

      return res.status(200).json(Item);
    } else {
      //get all items
      const { Items } = await client.send(
        new ScanCommand({
          TableName: process.env.TABLE_NAME,
          Select: "ALL_ATTRIBUTES",
        })
      );
      return res.status(200).json(Items);
    }
  }

  if (req.method === "POST") {
    const { Attributes } = await client.send(
      new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: req.body.id },
        },
        UpdateExpression: "set content = :c",
        ExpressionAttributeValues: {
          ":c": { S: req.body.content },
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return res.status(200).json(Attributes);
  }

  if (req.method === "DELETE") {
    await client.send(
      new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: req.body.id },
        },
      })
    );

    return res.status(204).json({});
  }
}
