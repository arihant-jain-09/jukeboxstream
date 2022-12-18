import React from "react";

const Slide = React.memo(function (props) {
  const { data, dataIndex } = props;
  const { cover } = data[dataIndex];
  return (
    <div
      style={{
        backgroundColor: "#EEEEEE",
        borderRadius: 15,
      }}
    >
      <img
        style={{
          width: 416,
          height: 236,
          margin: "10px 42px",
          display: "inline-block",
          backgroundColor: "#C4C4C4",
        }}
        draggable={false}
        src={cover}
      />
      <p
        style={{
          margin: "0px 42px",
          fontSize: 18,
          fontWeight: 700,
          marginTop: 25,
        }}
      >
        Título da Notícia
      </p>
      <p
        style={{
          marginTop: 8,
          margin: "0px 42px",
          fontWeight: 400,
          fontSize: 14,
        }}
      >
        Título da Notícia
      </p>
    </div>
  );
});
export default Slide;
