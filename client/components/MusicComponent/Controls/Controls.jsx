import React from "react";
import styles from "./Controls.module.scss";
import Repeat from "../../../assets/repeat.svg";
import Forward from "../../../assets/forward.svg";
import Backward from "../../../assets/backward.svg";
import Play from "../../../assets/play.svg";
import Pause from "../../../assets/pause.svg";
import Shuffle from "../../../assets/shuffle.svg";

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}) => {
  console.log(isPlaying);
  return (
    <div className={styles["controls"]}>
      <Repeat
        width="20"
        height="20"
        color={repeat ? "red" : "white"}
        onClick={() => setRepeat((prev) => !prev)}
        className="hidden sm:block cursor-pointer"
      />
      {/* {currentSongs?.length && ( */}
      <Backward width="20" height="20" fill="#FFF" onClick={handlePrevSong} />
      {/* )} */}
      {isPlaying ? (
        <Pause width="20" color="#FFF" onClick={handlePlayPause} />
      ) : (
        <Play height="20" color="#FFF" onClick={handlePlayPause} />
      )}
      {/* {currentSongs?.length && ( */}
      <Forward width="20" height="20" fill="#FFF" onClick={handleNextSong} />
      {/* )} */}
      <Shuffle
        color={shuffle ? "red" : "white"}
        onClick={() => setShuffle((prev) => !prev)}
        className="hidden sm:block cursor-pointer"
      />
    </div>
  );
};

export default Controls;
