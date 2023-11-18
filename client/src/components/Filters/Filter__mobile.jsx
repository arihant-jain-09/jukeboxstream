'use client';
import React from 'react';
import Genre from '../Genre/Genre';
import styles from './Filter.module.scss';
import Sort from '@/assets/sort.svg';

const Filter = () => {
  const arr = ['by Views', 'by Likes', 'by Date'];
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(arr[0]);
  console.log(selected);
  return (
    <div className={styles['filter']}>
      <Genre />
      <div className={styles['filter__sort']} onClick={() => setOpen(!open)}>
        <div className={styles['filter__sort-button']}>
          Sort
          <Sort />
        </div>
        {open && (
          <div className={styles['filter__sort-dropdown']}>
            {arr.map((item, idx) => (
              <div
                key={idx}
                className={styles['filter__sort-dropdown--item']}
                onClick={() => setSelected(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
