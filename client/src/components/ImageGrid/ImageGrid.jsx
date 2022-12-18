import React from "react";
import "./ImageGrid.scss";
const ImageGrid = ({ items }) => {
  return (
    <div className="imageGrid">
      {items &&
        items.map((item) => (
          <img className="imageGrid-item" src={item.imageUrl} alt="not found" />
        ))}
    </div>
  );
};

export default ImageGrid;
