import React from 'react';
import styles from './Upload.module.scss';
import UploadIcon from '@/assets/upload.svg';
import CoverImageIcon from '@/assets/cover.svg';
import Mp3Upload from '@/assets/mp3Upload.svg';
import Details from '@/assets/details.svg';

// import { genreArray } from "../../../utils/genreArray";

export const FormDetailsWrapper = ({ children }) => {
  return (
    <div className={styles['form__details']}>
      <div className={styles['form__details-svg']}>
        <Details />
      </div>

      {children}
    </div>
  );
};

export const FormGenreWrapper = ({ children }) => {
  return <div className={styles['form__genre']}>{children}</div>;
};

export const CustomInput = ({ value, onChange, children }) => {
  return (
    <div className={styles['form__input-container']}>
      <div className={styles['form__input-container--title']}>{children}</div>
      <input
        className={styles['form__input-container--input']}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const UploadFormWrapper = ({ children, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={styles['form']}>
      {children}
    </form>
  );
};

export const UploadFileWrapper = ({
  id,
  setState,
  pageNum,
  setPageNum,
  accept,
  name,
}) => {
  return (
    <div className={styles['upload-form-wrapper']}>
      <label htmlFor={id}>
        {id === 'coverupload' ? (
          <CoverImageIcon className={styles['form__label-upload--svg']} />
        ) : (
          <Mp3Upload className={styles['form__label-upload--svg']} />
        )}
      </label>
      <input
        id={id}
        className={styles['form__input-upload']}
        type="file"
        name={name}
        encType="multipart/form-data"
        accept={accept}
        onChange={(e) => {
          setState(e.target.files[0]);
          setPageNum(pageNum + 1);
        }}
      />
    </div>
  );
};
