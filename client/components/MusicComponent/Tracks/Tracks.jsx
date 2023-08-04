import React from 'react';
import styles from './Tracks.module.scss';

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className={styles['tracks']}>
    <div className={styles['tracks__img']}>
      <img src={activeSong?.cover} alt="cover art" className="rounded-full" />
    </div>
    <div className={styles['tracks__text']}>
      <p className={styles['tracks__text--title']}>
        {activeSong?.title
          ? activeSong?.title?.S || activeSong?.title
          : 'No active Song'}
      </p>
      <p className={styles['tracks__text--subtitle']}>
        {activeSong?.artist
          ? activeSong?.artist.S || activeSong?.artist
          : 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
