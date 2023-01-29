import styles from "./ImageGrid.module.scss";
import { useDispatch } from "react-redux";
import { SetCurrentSong, SetCurrentSongIndex } from "../../redux/userSlice";
import AddToQueue from "../../assets/addToQueue.svg";

const ImageGrid = ({ items, setSource, source, player }) => {
  const dispatch = useDispatch();
  const handleClick = async (item, idx) => {
    const {
      id: { S: itemId },
    } = item;
    let src = await player.playSong(itemId, true);
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
          } = item;
          return (
            <div key={idx} className={styles["imageGrid-item"]}>
              <img
                className={styles["imageGrid-item--img"]}
                src={item.cover}
                alt="not found"
                onClick={() => handleClick(item, idx)}
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
                <div className={styles["imageGrid-item__wrapper--right"]}>
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
