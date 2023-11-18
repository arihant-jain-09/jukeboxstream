'use client';
import React from 'react';
import Genre from '../Genre/Genre';
import styles from './Filter.module.scss';
import { useDispatch } from 'react-redux';
// import Sort from "../../assets/sort.svg";
import axios from 'axios';
import { FILTER_SONG_BY } from '@/utils/api-end-points';
import { SetAllSongs } from '@/redux/features/playerSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const [selectedSort, setSelectedSort] = React.useState(null);
  const sortList = [
    'Most Views',
    'Least Views',
    'Most Likes',
    'Least Likes',
    'Recently Added',
  ];

  const handleSortClick = async (item, idx) => {
    setSelectedSort(idx);
    if (idx == 2) {
      console.log(`${FILTER_SONG_BY}/${idx}`);
      const { data } = await axios.get(`${FILTER_SONG_BY}/${idx}`);
      // let songs = { ...data, duration: { S: "3:48" }, views: { S: "121k" } };
      // dispatch(SetAllSongs(songs));
      console.log(data);
    }
  };
  if (selectedSort) console.log(sortList[selectedSort]);
  return (
    <div className={styles['filter']}>
      <Genre />
      <div className={styles['filter__sort']}>
        {/* <div className={styles["filter__sort-button"]}>
          Sort
          <Sort />
        </div> */}
        <div className={styles['filter__sort-items']}>
          {sortList.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSortClick(item, idx)}
              className={`${styles['filter__sort-items--custom']} ${
                selectedSort === idx &&
                styles['filter__sort-items--custom--selected']
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
