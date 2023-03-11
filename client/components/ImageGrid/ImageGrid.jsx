import styles from "./ImageGrid.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentSong, SetCurrentSongIndex } from "../../redux/itemSlice";
import AddToQueue from "../../assets/addToQueue.svg";
import Love from "../../assets/love.svg";
import FilledLove from "../../assets/filledLove.svg";
import Play from "../../assets/play.svg";
import Pause from "../../assets/pause.svg";
import { useState } from "react";
import client from "../../services/redis";
import { itemsKey, userLikesKey } from "../../utils/redis_keys";
import { useEffect } from "react";

const ImageGrid = ({ items, setSource, source, player }) => {
  const dispatch = useDispatch();
  const [currentSongId, setCurrentSongId] = useState(null);
  const { isPlaying } = useSelector((state) => state.item);
  const { id: userId } = useSelector((state) => state.user);
  const [likeSet, setLikeSet] = useState([]);

  useEffect(() => {
    (async () => {
      const likeSet = await client.smembers(userLikesKey(userId));
      setLikeSet(likeSet);
    })();
  }, []);

  const handleClick = async (item, idx) => {
    const {
      id: { S: itemId },
    } = item;
    let src = await player.playSong(itemId, true);
    console.log(player.getCurrentSong());
    setCurrentSongId(idx);
    if (src) {
      setSource(src);
      dispatch(SetCurrentSong(item));
      dispatch(SetCurrentSongIndex(idx));
    }

    // axios
    //   .get(`http://localhost:5000/api/streams/${itemId}`)
    //   .then(({ data }) => {
    //     if ((data.status = 200)) {
    //       setSource(data.body);
    //     }
    //   })
    //   .catch((e) => console.log(e));
  };
  if (items && items.length > 0) console.log(items);
  const addItemToQueue = (item, idx) => {
    const {
      id: { S: itemId },
    } = item;
    player.addSongToQueue(itemId);
    console.log(player.printQueue());
  };

  const handleLike = async (itemId) => {
    const result = await client.sadd(userLikesKey(userId), itemId);
    if (result) {
      const incrementHash = await client.hincrby(itemsKey(itemId), "likes", 1);
      if (incrementHash) {
        console.log("incremented");
        setLikeSet([...likeSet, +itemId]);
      } else console.log("not incremented");
    } else console.log("already present");
    return;
  };

  const handleUnlike = async (itemId) => {
    const result = await client.srem(userLikesKey(userId), itemId);
    if (result) {
      const incrementHash = await client.hincrby(itemsKey(itemId), "likes", -1);
      if (incrementHash) {
        console.log("decremented");
        setLikeSet(likeSet.filter((item) => item !== +itemId));
      } else console.log("not decremented");
    } else console.log("already absent");
    return;
  };

  return (
    <div className={styles["imageGrid"]}>
      {items &&
        items.map((item, idx) => {
          const {
            title: { S: titleName },
            artist: { S: artistName },
            duration: { S: duration },
            views: { S: views },
            id: { S: itemId },
          } = item;

          return (
            <div
              key={idx}
              className={styles["imageGrid-item"]}
              // className={`${styles["imageGrid-item"]} ${
              //   currentSongId === idx && styles["imageGrid-item--disableHover"]
              // }`}
            >
              <div
                className={`${styles["imageGrid-item--play"]} ${
                  currentSongId === idx &&
                  styles["imageGrid-item--play--playing"]
                }`}
              >
                {isPlaying && currentSongId === idx ? (
                  <Pause />
                ) : (
                  <Play
                    onClick={() => {
                      if (currentSongId === idx) return;
                      else handleClick(item, idx);
                    }}
                  />
                )}
              </div>

              <img
                className={styles["imageGrid-item--img"]}
                src={item.cover}
                alt="not found"
              />
              <div className={styles["imageGrid-item__wrapper"]}>
                <div className={styles["imageGrid-item__wrapper--left"]}>
                  <div
                    className={styles["imageGrid-item__wrapper--left--title"]}
                  >
                    {titleName}
                  </div>
                  <div
                    className={styles["imageGrid-item__wrapper--left--artist"]}
                  >
                    {artistName}
                  </div>
                </div>
                <div className={styles["imageGrid-item__wrapper--middle"]}>
                  <div
                    className={
                      styles["imageGrid-item__wrapper--middle--duration"]
                    }
                  >
                    {duration}
                  </div>
                  <div
                    className={styles["imageGrid-item__wrapper--middle--like"]}
                    onClick={() => {
                      if (likeSet.includes(+itemId)) {
                        handleUnlike(itemId);
                      } else handleLike(itemId);
                    }}
                  >
                    {likeSet.includes(+itemId) ? <FilledLove /> : <Love />}
                  </div>
                </div>

                <div className={styles["imageGrid-item__wrapper--right"]}>
                  <div
                    className={styles["imageGrid-item__wrapper--right--like"]}
                  >
                    {views}
                  </div>
                  <div
                    className={
                      styles["imageGrid-item__wrapper--right--addToQueue"]
                    }
                  >
                    <AddToQueue onClick={() => addItemToQueue(item, idx)} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ImageGrid;
