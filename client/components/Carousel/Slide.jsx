import React from "react";
import styles from "./Slide.module.scss";

const Slide = React.memo(function (props) {
  const { data, dataIndex } = props;
  const { cover } = data[dataIndex];
  return (
    <div className={styles["slide"]}>
      <img
        style={{
          width: 416,
          height: 236,
          margin: "10px 42px",
        }}
        draggable={false}
        src={cover}
      />
    </div>
  );
});
export default Slide;
