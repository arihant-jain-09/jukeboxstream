import React from "react";
import "./Slide.scss";

const Slide = React.memo(function (props) {
  const { data, dataIndex } = props;
  const { cover } = data[dataIndex];
  return (
    <div className="slide">
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
