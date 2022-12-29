import React from "react";
import styles from "./Upload.module.scss";
import UploadIcon from "../../assets/upload.svg";
import CoverImageIcon from "../../assets/cover.svg";

// import { genreArray } from "../../../utils/genreArray";

export const FormDetailsWrapper = ({ children }) => {
  return <div className={styles["form__details"]}>{children}</div>;
};

export const FormGenreWrapper = ({ children }) => {
  return <div className={styles["form__genre"]}>{children}</div>;
};

export const CustomInput = ({ placeholder, value, onChange }) => {
  return (
    <div className={styles["form__input-container"]}>
      <input
        className={styles["form__input-container--input"]}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const UploadFormWrapper = ({ children, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={styles["form"]}>
      {children}
    </form>
  );
};

export const UploadFileWrapper = ({ id, setState, pageNum, setPageNum }) => {
  return (
    <div>
      <label htmlFor={id}>
        {id === "coverupload" ? (
          <CoverImageIcon className={styles["form__label-upload--svg"]} />
        ) : (
          <UploadIcon className={styles["form__label-upload--svg"]} />
        )}
      </label>
      <input
        id={id}
        className={styles["form__input-upload"]}
        type="file"
        name="file"
        onChange={(e) => {
          setState(e.target.files[0]);
          setPageNum(pageNum + 1);
        }}
      />
    </div>
  );
};
