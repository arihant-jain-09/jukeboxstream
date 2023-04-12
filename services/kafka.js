import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  brokers: [process.env.UPSTASH_KAFKA_BROKER],
  sasl: {
    mechanism: process.env.UPSTASH_KAFKA_SASL_MECHANISM,
    username: process.env.UPSTASH_KAFKA_REST_USERNAME,
    password: process.env.UPSTASH_KAFKA_REST_PASSWORD,
  },
  ssl: true,
});
