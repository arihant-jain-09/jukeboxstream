import React from 'react';
import styles from './Seekbar.module.scss';
import styled from 'styled-components';

const Seekbar = ({ buffered, value, min, max, onInput, colors, ...props }) => {
  // converts the time to format 0:00
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;
  // ${(props) => {
  //   console.log(props.lightVibrant);
  //   console.log("DATA");
  // }}
  const CustomSeekBar = styled.div`
    input[type='range'] {
      overflow: hidden;
      // width: 80px;
      -webkit-appearance: none;
      background-color: ${(props) => props.lightVibrant};
      // background-color: #9a905d;
      border-radius: 10px;
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
      background: ${(props) => props.vibrant};
      // background: #434343;
      box-shadow: -80px 0 0 80px ${(props) => props.darkVibrant};
      // box-shadow: -80px 0 0 80px #43e5f7;
    }

    /** FF*/
    input[type='range']::-moz-range-progress {
      background-color: ${(props) => props.darkVibrant};
    }
    input[type='range']::-moz-range-track {
      background-color: ${(props) => props.lightVibrant};
    }
    /* IE*/
    input[type='range']::-ms-fill-lower {
      background-color: ${(props) => props.darkVibrant};
    }
    input[type='range']::-ms-fill-upper {
      background-color: ${(props) => props.lightVibrant};
    }
  `;

  return (
    <CustomSeekBar
      className={styles['seekbar']}
      lightVibrant={colors?.LightVibrant}
      darkVibrant={colors?.DarkVibrant}
      // muted={colors?.Muted}
      // darkMuted={colors?.DarkMuted}
      // lightMuted={colors?.LightMuted}
      vibrant={colors?.Vibrant}
      colors={colors}
    >
      <p className={styles['time']}>{value === 0 ? '0:00' : getTime(value)}</p>
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
      <p className={styles['time']}>{max === 0 ? '0:00' : getTime(max)}</p>
    </CustomSeekBar>
  );
};

export default Seekbar;
