import "./loadEnv.js";
import express, { urlencoded, json } from "express";
import cors from "cors";
import streamRoutes from "./routes/streamRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import redisRoutes from "./routes/redisRoutes.js";
import geoRoutes from "./routes/geoRoutes.js";

const app = express();
app.use(urlencoded({ limit: "30mb", extended: true }));
app.use(json({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api", streamRoutes);
app.use("/api", uploadRoutes);
app.use("/api", redisRoutes);
app.use("/api", geoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
