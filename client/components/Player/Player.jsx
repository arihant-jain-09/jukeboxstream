import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
} from "media-chrome/dist/react";
import styles from "./Player.module.scss";
import Hls from "hls.js";
import { useEffect, useRef } from "react";

const Player = ({ source, poster }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      //   hls.loadSource(source);
      var enc = new TextEncoder("utf-8");
      hls.loadSource(URL.createObjectURL(new Blob([enc.encode(source)])));
      hls.attachMedia(ref.current);
    } else console.log("hls not supported");

    return () => {};
  }, [source]);

  return (
    <MediaController className={styles["player"]}>
      <audio ref={ref} slot="media" crossorigin poster={poster}>
        {/* <track
          label="thumbnails"
          default
          kind="metadata"
          src="https://image.mux.com/3taBcOqKMfNG029QjBCJMKLviq13OrV6S/storyboard.vtt"
        /> */}
      </audio>

      <MediaControlBar>
        <MediaPlayButton></MediaPlayButton>
        <MediaSeekBackwardButton></MediaSeekBackwardButton>
        <MediaSeekForwardButton></MediaSeekForwardButton>
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay showDuration></MediaTimeDisplay>
        <MediaMuteButton></MediaMuteButton>
        <MediaVolumeRange></MediaVolumeRange>
      </MediaControlBar>
    </MediaController>
  );
};

export default Player;
