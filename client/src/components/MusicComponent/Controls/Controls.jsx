import React from 'react';
import styles from './Controls.module.scss';
import Repeat from '@/assets/repeat.svg';
import Forward from '@/assets/forward.svg';
import Backward from '@/assets/backward.svg';
import Play from '@/assets/play.svg';
import Pause from '@/assets/pause.svg';
import Shuffle from '@/assets/shuffle.svg';
import styled from 'styled-components';

const Controls = ({
  colors,
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
  ...props
}) => {
  // console.log(colors.Vibrant);
  const SvgWrapper = styled.div`
    padding: 0.1rem;
    cursor: pointer;
    &:hover svg {
      fill: ${colors?.DarkVibrant};
      path {
        color: ${colors?.DarkVibrant};
      }
    }
  `;

  return (
    <div className={styles['controls']}>
      <SvgWrapper
        className={styles['controls__svgWrapper']}
        $other={true}
        onClick={() => setRepeat((prev) => !prev)}
      >
        <Repeat
          width="20"
          height="20"
          color={repeat ? colors.DarkVibrant : 'white'}
          className="hidden sm:block cursor-pointer"
        />
      </SvgWrapper>
      <SvgWrapper
        className={styles['controls__svgWrapper']}
        onClick={handlePrevSong}
      >
        <Backward width="20" height="20" fill="#FFF" />
      </SvgWrapper>

      {/* {currentSongs?.length && ( */}

      {/* )} */}
      {isPlaying ? (
        <SvgWrapper
          className={styles['controls__svgWrapper']}
          onClick={handlePlayPause}
        >
          <Pause width="20" color="#FFF" />
        </SvgWrapper>
      ) : (
        <SvgWrapper
          className={styles['controls__svgWrapper']}
          onClick={handlePlayPause}
        >
          <Play height="20" color="#FFF" />
        </SvgWrapper>
      )}
      {/* {currentSongs?.length && ( */}
      <SvgWrapper
        className={styles['controls__svgWrapper']}
        onClick={handleNextSong}
      >
        <Forward width="20" height="20" fill="#FFF" />
      </SvgWrapper>
      <SvgWrapper
        className={styles['controls__svgWrapper']}
        $other={true}
        onClick={() => setShuffle((prev) => !prev)}
      >
        <Shuffle
          color={shuffle ? colors.DarkVibrant : 'white'}
          // color={shuffle ? "red" : "white"}
        />
      </SvgWrapper>
    </div>
  );
};

export default Controls;
