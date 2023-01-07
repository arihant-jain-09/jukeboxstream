import React, { useState } from "react";
import styles from "./ImageGrid.module.scss";
const ImageGrid = ({ items }) => {
  const [currentSong, setCurrentSong] = useState(null);

  const handleClick = (item) => {
    const { s3Name } = item;
    const folderName = s3Name.substr(0, s3Name.lastIndexOf("."));
    const m3u8FilePath = `${folderName}/${folderName}.m3u8`;
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
