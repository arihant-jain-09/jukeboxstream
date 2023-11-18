import styles from './Player.module.scss';
import Hls from 'hls.js';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentTime, SetIsPlaying } from '@/redux/features/playerSlice';
// import ioredis from "ioredis";

const Player = ({
  source,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
  onProgress,
  ...props
}) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      //   hls.loadSource(source);
      var enc = new TextEncoder('utf-8');
      hls.loadSource(URL.createObjectURL(new Blob([enc.encode(source)])));
      hls.attachMedia(ref.current);
      console.log('hls supported');
    } else console.log('hls not supported');

    return () => {};
  }, [source]);

  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  // console.log(ref?.current?.currentTime);

  return (
    <div className={styles['player']}>
      <audio
        ref={ref}
        slot="media"
        loop={repeat}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        onLoadedData={onLoadedData}
        onProgress={onProgress}
      />
    </div>
  );
};

export default Player;
