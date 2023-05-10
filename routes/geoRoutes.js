import express from "express";
import { kafka } from "../services/kafka.js";
import { AddGeoPointOfUser } from "../utils/kafkaTopics.js";

const router = express.Router();

const topic = AddGeoPointOfUser();

// ---------------------------Geo--------------------------
router.post("/location", async (req, res) => {
  console.log(req.body);
  const { latitude, longitude, userId } = req.body;
  const producer = kafka.producer();

  producer.on("producer.connect", () => {
    console.log(`KafkaProvider: connected`);
  });
  producer.on("producer.disconnect", () => {
    console.log(`KafkaProvider: disconnected`);
  });
  producer.on("producer.network.request_timeout", (payload) => {
    console.log(`KafkaProvider: request timeout ${payload.clientId}`);
  });

  const message = {
    value: JSON.stringify({
      lat: latitude,
      long: longitude,
      userId: userId,
    }),
  };
  await producer.connect();
  await producer
    .send({
      topic,
      messages: [message],
    })
    .then(console.log)
    .catch((e) => console.error(`[example/producer] ${e.message}`, e));
  console.log("finished geo point");
  await producer.disconnect();
  res.send("success");
});
router.get("/location", async (req, res) => {
  res.send({ message: "succ" });
});
export default router;
