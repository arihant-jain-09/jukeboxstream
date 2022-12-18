import express from "express";
import { db } from "../services/dynamoDB.js";
import { ScanCommand } from "@aws-sdk/client-dynamodb";

const router = express.Router();

router.get("/streams/all", async (req, res) => {
  const command = new ScanCommand({
    TableName: "streams",
    Select: "ALL_ATTRIBUTES",
  });
  const data = await db.send(command);
  res.send(data.Items);
});

export default router;
