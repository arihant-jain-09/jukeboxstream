import React from "react";
import styles from "./ImageGrid.module.scss";
const ImageGrid = ({ items }) => {
  return (
    <div className={styles["imageGrid"]}>
      {items &&
        items.map((item) => (
          <img
            className={styles["imageGrid-item"]}
            src={item.cover}
            alt="not found"
          />
        ))}
    </div>
  );
};

export default ImageGrid;
