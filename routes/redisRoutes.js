import express from "express";
import { client } from "../services/redis.js";
import {
  itemsKey,
  userLikesKey,
  itemByLikesKey,
  itemByViewsKey,
  itemColorKey,
} from "../utils/redis-keys.js";

const router = express.Router();

// ---------------------------Hyperloglog--------------------------
router.post("/song/view/incr", async (req, res) => {
  const { userId, itemId } = req.body;
  console.log(userId, itemId);
  const result = await client.pfadd(itemByViewsKey(itemId), userId);
  console.log(result);
});

// ---------------------------Colors--------------------------
router.get("/song/colors/:songId", async (req, res) => {
  const songId = +req.params.songId;
  const result = await client.hgetall(itemColorKey(songId));
  console.log(result);
  res.status(200).json(result);
});

// -----------------------------------------------------------------
// ---------------------------Filter-------------------------------
router.get("/song/filter/:idx", async (req, res) => {
  const idx = +req.params.idx;
  if (idx === 0) {
    console.log("filter by most views");
    res.send("filter by most views");
  } else if (idx === 1) {
    console.log("filter by least views");
    res.send("filter by least views");
  } else if (idx === 2) {
    console.log("filter by most likes");
    const idByLikes = await client.zrange(
      itemByLikesKey(),
      0,
      -1,
      "WITHSCORES",
      "REV",
      "LIMIT",
      0,
      10
    );
    const results = idByLikes.map((item) => client.hgetall(itemsKey(item)));
    const final = await Promise.all(results);
    res.send(final);
  } else if (idx === 3) {
    console.log("filter by least likes");
    res.send("filter by least likes");
  } else if (idx === 4) {
    console.log("filter by most recent");
    res.send("filter by most recent");
  } else res.status(500).json({ message: "Invalid filter type" });
});
// ------------------------------------------------------------
// ---------------------------likes----------------------------

router.get("/likes/user/:userId", async (req, res) => {
  const result = await client.smembers(userLikesKey(req.params.userId));
  res.status(200).json(result);
});

router.post("/song/likes/incr", async (req, res) => {
  const { userId, itemId } = req.body;
  const result = await client.sadd(userLikesKey(userId), itemId);
  if (result) {
    const incrementHash = await Promise.all([
      client.hincrby(itemsKey(itemId), "likes", 1),
      client.zincrby(itemByLikesKey(), 1, itemId),
    ]);
    console.log(incrementHash);
    if (incrementHash) {
      console.log("incremented");
      res.status(200).json({ message: "1" });
    } else res.status(200).json({ message: "0" });
  } else res.status(200).json({ message: "-1" });
});

router.post("/song/likes/decr", async (req, res) => {
  const { userId, itemId } = req.body;
  const result = await client.srem(userLikesKey(userId), itemId);
  if (result) {
    const decrementedHash = await Promise.all([
      client.hincrby(itemsKey(itemId), "likes", -1),
      client.zincrby(itemByLikesKey(), -1, itemId),
    ]);
    console.log(decrementedHash);
    if (decrementedHash) {
      console.log("decremented");
      res.status(200).json({ message: "1" });
    } else res.status(200).json({ message: "0" });
  } else res.status(200).json({ message: "-1" });
});

// --------------------------------------------------------------

export default router;
