import React from "react";
import styles from "./Seekbar.module.scss";
import styled from "styled-components";

const Seekbar = ({ buffered, value, min, max, onInput, colors }) => {
  // converts the time to format 0:00
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  const CustomSeekBar = styled.div`
  input[type='range'] {
    overflow: hidden;
    width: 80px;
    -webkit-appearance: none;
    background-color: #9a905d;
  }
  
  input[type='range']::-webkit-slider-runnable-track {
    height: 10px;
    -webkit-appearance: none;
    color: #13bba4;
    margin-top: -1px;
  }
  
  input[type='range']::-webkit-slider-thumb {
    width: 10px;
    -webkit-appearance: none;
    height: 10px;
    cursor: ew-resize;
    background: #434343;
    box-shadow: -80px 0 0 80px #43e5f7;
  }

  }
  /** FF*/
  input[type="range"]::-moz-range-progress {
  background-color: #43e5f7; 
  }
  input[type="range"]::-moz-range-track {  
  background-color: #9a905d;
  }
  /* IE*/
  input[type="range"]::-ms-fill-lower {
  background-color: #43e5f7; 
  }
  input[type="range"]::-ms-fill-upper {  
  background-color: #9a905d;
  }
  `;

  return (
    <CustomSeekBar
      className={styles["seekbar"]}
      // lightVibrant={colors?.LightVibrant}
      // darkVibrant={colors?.DarkVibrant}
      // muted={colors?.Muted}
      // darkMuted={colors?.DarkMuted}
      // lightMuted={colors?.LightMuted}
      // vibrant={colors?.Vibrant}
      colors={colors}
    >
      <p className="text-white">{value === 0 ? "0:00" : getTime(value)}</p>
      <input
        colors={colors}
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        // style={{
        //   background: `linear-gradient(to right, ${colors.DarkMuted} ${buffered}%, ${colors.DarkVibrant} ${value}%)`,
        // }}
        // style={{
        //   background: `${colors.Muted}`,
        // }}
      />
      <p className="text-white">{max === 0 ? "0:00" : getTime(max)}</p>
    </CustomSeekBar>
  );
};

export default Seekbar;
