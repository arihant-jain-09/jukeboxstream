'use client';
import styles from './ImageGrid.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  SetActiveSong,
  SetAllSongs,
  SetCurrentIndex,
  SetIsPlaying,
} from '@/redux/features/playerSlice';
import AddToQueue from '@/assets/addToQueue.svg';
import Love from '@/assets/love.svg';
import FilledLove from '@/assets/filledLove.svg';
import Play from '@/assets/play.svg';
import Pause from '@/assets/pause.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  DECREASE_SONG_LIKES,
  GET_USER_LIKES,
  INCREASE_SONG_LIKES,
} from '@/utils/api-end-points';

import { GETAPI, POSTAPI } from '@/utils/callAPI';
import { usePathname } from 'next/navigation';

const ImageGrid = ({ apiRoute, user }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const userId = user?.username;
  const [likeSet, setLikeSet] = useState([]);
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (pathname == '/') {
      GETAPI(apiRoute, 'streams')
        .then((data) => {
          data = data.map((item) => {
            return { ...item, duration: { S: '3:48' }, views: { S: '121k' } };
          });
          setItems(data);
          dispatch(SetAllSongs(data));
        })
        .catch((e) => console.log(e));
    } else {
      POSTAPI(apiRoute, { userId }, 'streams')
        .then((data) => {
          console.log(data);
          data = data.map((item) => {
            return { ...item, duration: { S: '3:48' }, views: { S: '121k' } };
          });
          setItems(data);
          dispatch(SetAllSongs(data));
        })
        .catch((e) => console.log(e));
    }

    (async () => {
      GETAPI(GET_USER_LIKES + '/' + userId, 'likes')
        .then((data) => {
          setLikeSet(data);
        })
        .catch((e) => console.log(e));
    })();
  }, [apiRoute, dispatch, pathname, userId]);

  const handlePauseSong = async () => {
    dispatch(SetIsPlaying(false));
  };
  const handlePlaySong = async (item) => {
    if (pathname === '/mysongs') {
      item = { ...item, type: 'user' };
    }
    dispatch(SetActiveSong(item));
    dispatch(SetIsPlaying(true));
  };
  // if (items && items.length > 0) console.log(items);

  const handleLike = async (itemId) => {
    POSTAPI(INCREASE_SONG_LIKES, { userId, itemId }, 'likes')
      .then((data) => {
        if (data?.message == 1) setLikeSet([...likeSet, itemId]);
      })
      .catch((e) => console.log(e));

    // const { data } = await axios.post(INCREASE_SONG_LIKES, { userId, itemId });
    // console.log(data.message);
    // if (data?.message == 1) setLikeSet([...likeSet, itemId]);
  };

  const handleUnlike = async (itemId) => {
    POSTAPI(DECREASE_SONG_LIKES, { userId, itemId }, 'likes')
      .then((data) => {
        if (data?.message == 1)
          setLikeSet(likeSet.filter((item) => item !== itemId));
      })
      .catch((e) => console.log(e));

    // const { data } = await axios.post(DECREASE_SONG_LIKES, { userId, itemId });
    // console.log(data.message);
    // if (data?.message == 1)
    //   setLikeSet(likeSet.filter((item) => item !== itemId));
    // return;
  };
  return (
    <div className={styles['imageGrid']}>
      {items &&
        items.map((item, idx) => {
          let titleName = '',
            artistName = '',
            duration = '',
            views = '',
            itemId = '';
          if (process.env.ENV == 'dev') {
            const {
              title: { S: titleNameTemp },
              artist: { S: artistNameTemp },
              duration: { S: durationTemp },
              views: { S: viewsTemp },
              id: { N: itemIdTemp },
            } = item;

            // Assign the destructured values to the variables
            titleName = titleNameTemp;
            artistName = artistNameTemp;
            duration = durationTemp;
            views = viewsTemp;
            itemId = itemIdTemp;
          } else {
            const {
              title: titleNameTemp,
              artist: artistNameTemp,
              duration: { S: durationTemp },
              views: { S: viewsTemp },
              id: itemIdTemp,
            } = item;
            // Assign the destructured values to the variables
            titleName = titleNameTemp;
            artistName = artistNameTemp;
            duration = durationTemp;
            views = viewsTemp;
            itemId = itemIdTemp;
          }

          console.log(titleName, artistName, duration, views, itemId);

          return (
            <div
              key={idx}
              className={`${styles['imageGrid-item']} ${
                (activeSong?.id?.N === itemId || activeSong?.id === itemId) &&
                styles['imageGrid-item--disableHover']
              }`}
            >
              <div
                className={`${styles['imageGrid-item--play']} ${
                  (activeSong?.id?.N === itemId || activeSong?.id === itemId) &&
                  styles['imageGrid-item--play--playing']
                }`}
              >
                {isPlaying &&
                (activeSong?.id?.N === itemId || activeSong?.id === itemId) ? (
                  <Pause
                    onClick={() => {
                      handlePauseSong();
                    }}
                  />
                ) : (
                  <Play
                    onClick={() => {
                      handlePlaySong(item, itemId);
                    }}
                  />
                )}
              </div>

              <img
                className={styles['imageGrid-item--img']}
                src={item.cover}
                alt="not found"
              />
              <div className={styles['imageGrid-item__wrapper']}>
                <div className={styles['imageGrid-item__wrapper--left']}>
                  <div
                    className={styles['imageGrid-item__wrapper--left--title']}
                  >
                    {titleName.S || titleName}
                  </div>
                  <div
                    className={styles['imageGrid-item__wrapper--left--artist']}
                  >
                    {artistName.S || artistName}
                  </div>
                </div>
                <div className={styles['imageGrid-item__wrapper--middle']}>
                  <div
                    className={
                      styles['imageGrid-item__wrapper--middle--duration']
                    }
                  >
                    {duration}
                  </div>
                  <div
                    className={styles['imageGrid-item__wrapper--middle--like']}
                    onClick={async () => {
                      if (likeSet.map(Number).includes(itemId)) {
                        handleUnlike(itemId);
                      } else handleLike(itemId);
                    }}
                  >
                    {likeSet.map(Number).includes(itemId) ? (
                      <FilledLove />
                    ) : (
                      <Love />
                    )}
                  </div>
                </div>

                <div className={styles['imageGrid-item__wrapper--right']}>
                  <div
                    className={styles['imageGrid-item__wrapper--right--like']}
                  >
                    {views}
                  </div>
                  <div
                    className={
                      styles['imageGrid-item__wrapper--right--addToQueue']
                    }
                  >
                    {/* <AddToQueue onClick={() => addItemToQueue(item, itemId)} /> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ImageGrid;
