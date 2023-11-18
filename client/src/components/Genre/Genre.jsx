'use client';
import React from 'react';
import styles from './Genre.module.scss';
import { genreArray } from '@/utils/genreArray';

const Genre = () => {
  const [selectedGenre, setSelectedGenre] = React.useState([]);
  // const genreList = ["pop", "jazz", "electronic"];
  const genreList = genreArray.slice(0, 2);

  const handleGenreClick = (genre) => {
    if (selectedGenre.includes(genre)) {
      setSelectedGenre(selectedGenre.filter((item) => item !== genre));
    } else {
      setSelectedGenre([...selectedGenre, genre]);
    }
  };
  console.log(selectedGenre);

  return (
    <>
      <div className={styles['genre']}>
        {genreList.map((genre, idx) => (
          <div
            key={idx}
            onClick={() => handleGenreClick(genre)}
            className={`${styles['genre__custom']} ${
              selectedGenre.includes(genre) && styles['genre__custom--selected']
            }`}
          >
            {genre}
          </div>
        ))}
      </div>
    </>
  );
};

export default Genre;
