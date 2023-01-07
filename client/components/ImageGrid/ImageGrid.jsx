import axios from "axios";
import React, { useState } from "react";
import styles from "./ImageGrid.module.scss";
const ImageGrid = ({ items, setSource, source }) => {
  const [currentSong, setCurrentSong] = useState(null);

  const handleClick = (item) => {
    const {
      id: { S: itemId },
    } = item;

    axios
      .get(`http://localhost:5000/api/streams/${itemId}`)
      .then(({ data }) => {
        if ((data.status = 200)) {
          setSource(data.body);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className={styles["imageGrid"]}>
      {items &&
        items.map((item) => {
          const {
            title: { S: titleName },
            artist: { S: artistName },
          } = item;
          return (
            <div
              className={styles["imageGrid-item"]}
              onClick={() => handleClick(item)}
            >
              <img
                className={styles["imageGrid-item--img"]}
                src={item.cover}
                alt="not found"
              />
              <div className={styles["imageGrid-item--title"]}>{titleName}</div>
              <div className={styles["imageGrid-item--artist"]}>
                {artistName}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ImageGrid;
