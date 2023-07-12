import styles from "./ImageGrid.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  SetActiveSong,
  SetAllSongs,
  SetCurrentIndex,
  SetIsPlaying,
} from "../../redux/features/playerSlice";
import AddToQueue from "../../assets/addToQueue.svg";
import Love from "../../assets/love.svg";
import FilledLove from "../../assets/filledLove.svg";
import Play from "../../assets/play.svg";
import Pause from "../../assets/pause.svg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  DECREASE_SONG_LIKES,
  GET_USER_LIKES,
  INCREASE_SONG_LIKES,
} from "../../utils/api-end-points";

const ImageGrid = ({ apiRoute, type }) => {
  const dispatch = useDispatch();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const { id: userId, accessToken } = useSelector((state) => state.user);
  const [likeSet, setLikeSet] = useState([]);
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (type == "GET") {
      // axios
      //   .get("http://localhost:5000/api/streams", {
      //     headers: { Authorization: accessToken },
      //   })
      //   .then((resp) => {
      //     console.log(resp);
      //   });
      axios
        .get(apiRoute)
        .then(({ data }) => {
          data = data.map((item) => {
            return { ...item, duration: { S: "3:48" }, views: { S: "121k" } };
          });
          setItems(data);
          dispatch(SetAllSongs(data));
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .post(apiRoute, { userId })
        .then(({ data }) => {
          data = data.map((item) => {
            return { ...item, duration: { S: "3:48" }, views: { S: "121k" } };
          });
          setItems(data);
          dispatch(SetAllSongs(data));
        })
        .catch((e) => console.log(e));
    }

    (async () => {
      console.log(`${GET_USER_LIKES}/${userId}`);
      const { data } = await axios.get(`${GET_USER_LIKES}/${userId}`);
      console.log("result: ", data);
      setLikeSet(data);
    })();
  }, []);

  const handlePauseSong = async () => {
    dispatch(SetIsPlaying(false));
  };
  const handlePlaySong = async (item) => {
    dispatch(SetActiveSong(item));
    dispatch(SetIsPlaying(true));
  };
  // if (items && items.length > 0) console.log(items);

  const handleLike = async (itemId) => {
    const { data } = await axios.post(INCREASE_SONG_LIKES, { userId, itemId });
    console.log(data.message);
    if (data?.message == 1) setLikeSet([...likeSet, itemId]);
  };

  const handleUnlike = async (itemId) => {
    const { data } = await axios.post(DECREASE_SONG_LIKES, { userId, itemId });
    console.log(data.message);
    if (data?.message == 1)
      setLikeSet(likeSet.filter((item) => item !== itemId));
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
            id: { N: itemId },
          } = item;

          return (
            <div
              key={idx}
              className={`${styles["imageGrid-item"]} ${
                activeSong?.id?.N === itemId &&
                styles["imageGrid-item--disableHover"]
              }`}
            >
              <div
                className={`${styles["imageGrid-item--play"]} ${
                  activeSong?.id?.N === itemId &&
                  styles["imageGrid-item--play--playing"]
                }`}
              >
                {isPlaying && activeSong?.id?.N === itemId ? (
                  <Pause
                    onClick={() => {
                      handlePauseSong();
                    }}
                  />
                ) : (
                  <Play
                    onClick={() => {
                      handlePlaySong(item, itemId);
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
                    onClick={async () => {
                      if (likeSet.includes(itemId)) {
                        handleUnlike(itemId);
                      } else handleLike(itemId);
                    }}
                  >
                    {likeSet.includes(itemId) ? <FilledLove /> : <Love />}
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
                    {/* <AddToQueue onClick={() => addItemToQueue(item, itemId)} /> */}
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
