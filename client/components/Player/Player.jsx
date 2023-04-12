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
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentTime, SetIsPlaying } from "../../redux/features/playerSlice";
import axios from "axios";
import { INCR_SONG_VIEW } from "../../utils/api-end-points";
// import ioredis from "ioredis";

const Player = ({ source, poster, player }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const {
    isPlaying,
    activeSong: { id: itemId },
  } = useSelector((state) => state.player);

  const { id: userId } = useSelector((state) => state.user);
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

  // console.log(ref?.current?.currentTime);

  return (
    <div className={styles["player"]}>
      <MediaController className={styles["player__mediaController"]} audio>
        <audio
          ref={ref}
          slot="media"
          crossorigin
          poster={poster}
          onTimeUpdate={async (e) => {
            // console.log(e.target.duration * 0.3);
            // if (e.target.currentTime > 1) {
            //   // const check = await client.pfadd(itemByViewsKey(id), userId);
            //   // console.log(check);
            //   const { data } = await axios.post(INCR_SONG_VIEW, {
            //     userId,
            //     itemId: itemId.S,
            //   });
            //   console.log(data);
            // }
            console.log(e.target.currentTime);
            dispatch(SetCurrentTime(e.target.currentTime));
          }}
        >
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
              onClick={() => player.musicQ.backValue()}
            >
              <Backward />
            </div>
            <div
              className={
                styles["player__mediaController__container-top--playButton"]
              }
              onClick={() => dispatch(SetIsPlaying(!isPlaying))}
            >
              <MediaPlayButton></MediaPlayButton>
            </div>
            <div
              className={
                styles["player__mediaController__container-top--forwardButton"]
              }
              onClick={() => player.playNextSong()}
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
