import React from 'react';
import Controls from './Controls/Controls';
import Track from './Tracks/Tracks';
import styles from './MusicComponent.module.scss';
import Player from './Player/Player';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Seekbar from './SeekBar/Seekbar';
import {
  useGetSongDetailsQuery,
  useGetUserSongDetailsQuery,
} from '../../redux/services/api';
import {
  SetColors,
  SetIsPlaying,
  SetData,
} from '../../redux/features/playerSlice';
import { BASE_GET_SONG_COLOR } from '../../utils/api-end-points';
import { GETAPI, POSTAPI } from '../../utils/callAPI';

const MusicComponent = ({ type }) => {
  const {
    activeSong,
    currentSongs,
    currentIndex,
    isActive,
    isPlaying,
    colors,
    m3u8,
  } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [buffered, setBuffered] = useState();
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();
  // const [colors, setColors] = useState(null);
  const { id: userId, accessToken } = useSelector((state) => state.user);
  // console.log("Music Component");
  // console.log(activeSong);
  // const { data, isFetching, error } = useGetSongDetailsQuery({
  //   id: activeSong?.id?.N,
  // });
  // console.log(activeSong);
  let timestamp = new Date(
    activeSong?.timestamp?.S || activeSong?.timestamp
  ).getTime();
  const HASHKEY =
    `${activeSong?.artist.S}_${timestamp}` ||
    `${activeSong?.artist}_${timestamp}`;
  const { data, isFetching, error } =
    type == 'user'
      ? useGetUserSongDetailsQuery({
          id: HASHKEY,
          userId,
        })
      : useGetSongDetailsQuery({
          id: HASHKEY,
        });
  // console.log(error);
  useEffect(() => {
    if (data) dispatch(SetData(data));
    return () => {};
  }, [data]);

  // console.log(data?.body);

  useEffect(() => {
    if (currentSongs.length) dispatch(SetIsPlaying(true));
  }, [currentIndex]);

  useEffect(() => {
    if (type == 'user') {
      console.log('user type');
      (async () => {
        const data = await POSTAPI(
          `${BASE_GET_SONG_COLOR}/${HASHKEY}`,
          { userId },
          'song'
        );
        dispatch(SetColors(data));
        console.log(data);
      })();
    } else {
      (async () => {
        const data = await GETAPI(`${BASE_GET_SONG_COLOR}/${HASHKEY}`, 'song');
        dispatch(SetColors(data));
        console.log(data);
      })();
    }

    return () => {};
  }, [HASHKEY]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(SetIsPlaying(false));
    } else {
      dispatch(SetIsPlaying(true));
    }
  };

  const handleNextSong = () => {
    dispatch(SetIsPlaying(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  const handleProgress = (event) => {
    const bufferedEnd = event.target.buffered.end(0);
    const duration = event.target.duration;
    setBuffered((bufferedEnd / duration) * 100);
  };

  return (
    <div
      className={styles['musicComponent']}
      style={{
        background: `linear-gradient(to bottom,  ${colors?.DarkVibrant} 0%,${colors?.LightVibrant} 100%)`,
      }}
    >
      <div className={styles['musicComponent__header']}>Now Playing</div>
      {/* <div className={styles["musicComponent__image"]}>
        <img src="/red.jpg" alt="red" />
      </div> */}
      <Track
        isPlaying={isPlaying}
        isActive={isActive}
        activeSong={activeSong}
      />
      {!isFetching && (
        <div className={styles['musicComponent__player']}>
          <div className={styles['musicComponent__player--container']}>
            <Seekbar
              value={currentTime}
              min="0"
              max={duration}
              onInput={(event) => setSeekTime(event.target.value)}
              buffered={buffered}
              colors={colors}
            />
            <Controls
              isPlaying={isPlaying}
              isActive={isActive}
              repeat={repeat}
              setRepeat={setRepeat}
              shuffle={shuffle}
              colors={colors}
              setShuffle={setShuffle}
              currentSongs={currentSongs}
              handlePlayPause={handlePlayPause}
              handlePrevSong={handlePrevSong}
              handleNextSong={handleNextSong}
            />
          </div>

          <Player
            source={data?.body || m3u8?.body}
            volume={volume}
            isPlaying={isPlaying}
            seekTime={seekTime}
            repeat={repeat}
            currentIndex={currentIndex}
            onEnded={handleNextSong}
            onTimeUpdate={(event) => setCurrentTime(event.target.currentTime)}
            onLoadedData={(event) => setDuration(event.target.duration)}
            onProgress={handleProgress}
          />
        </div>
      )}
    </div>
  );
};

export default MusicComponent;
