import styles from "./ImageGrid.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentSong, SetCurrentSongIndex } from "../../redux/userSlice";
import AddToQueue from "../../assets/addToQueue.svg";
import Love from "../../assets/love.svg";
import Play from "../../assets/play.svg";
import { useState } from "react";

const ImageGrid = ({ items, setSource, source, player }) => {
  const dispatch = useDispatch();
  const [currentSongId, setCurrentSongId] = useState(null);

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
  console.log(items);
  const addItemToQueue = (item, idx) => {
    const {
      id: { S: itemId },
    } = item;
    player.addSongToQueue(itemId);
    console.log(player.printQueue());
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
          } = item;
          return (
            <div
              key={idx}
              className={styles["imageGrid-item"]}
              onClick={() => handleClick(item, idx)}
            >
              <div
                className={`${
                  currentSongId === idx
                    ? styles["imageGrid-item--play"]
                    : styles["imageGrid-item--play"]
                }`}
              >
                <Play />
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
                  >
                    <Love />
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
