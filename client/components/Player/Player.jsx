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
  MediaPlaybackRateButton,
  MediaLoadingIndicator,
  MediaDurationDisplay,
} from "media-chrome/dist/react";
import styles from "./Player.module.scss";
import Hls from "hls.js";
import { useEffect, useRef } from "react";
import Forward from "../../assets/forward.svg";
import Backward from "../../assets/backward.svg";

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
    <div className={styles["player"]}>
      <MediaController className={styles["player__mediaController"]} audio>
        <audio ref={ref} slot="media" crossorigin poster={poster}>
          {/* <track
          label="thumbnails"
          default
          kind="metadata"
          src="https://image.mux.com/3taBcOqKMfNG029QjBCJMKLviq13OrV6S/storyboard.vtt"
        /> */}
        </audio>

        <MediaControlBar
          className={styles["player__mediaController__container"]}
        >
          <div className={styles["player__mediaController__container-top"]}>
            <div
              className={
                styles["player__mediaController__container-top--backwardButton"]
              }
            >
              <Backward />
            </div>
            <div
              className={
                styles["player__mediaController__container-top--playButton"]
              }
            >
              <MediaPlayButton></MediaPlayButton>
            </div>
            <div
              className={
                styles["player__mediaController__container-top--forwardButton"]
              }
            >
              <Forward />
            </div>
          </div>
          <div className={styles["player__mediaController__container-bottom"]}>
            <div
              className={
                styles["player__mediaController__container-bottom--left"]
              }
            >
              <MediaTimeDisplay></MediaTimeDisplay>
              <MediaTimeRange></MediaTimeRange>
              <MediaDurationDisplay></MediaDurationDisplay>
            </div>
            <div
              className={
                styles["player__mediaController__container-bottom--right"]
              }
            >
              <MediaMuteButton></MediaMuteButton>
              <MediaVolumeRange></MediaVolumeRange>
            </div>
          </div>
        </MediaControlBar>
      </MediaController>
    </div>
  );
};

export default Player;
