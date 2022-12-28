import React, { useState } from "react";
import { s3 } from "../../utils/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import styles from "./upload.module.scss";
import UploadIcon from "../../assets/upload.svg";
import CoverImageIcon from "../../assets/cover.svg";
import Button from "../Button/button";
// import { genreArray } from "../../../utils/genreArray";

const CustomInput = ({ placeholder, value, onChange }) => {
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

const DesktopUpload = () => {
  const [artistName, setArtistName] = useState("");
  const [titleName, setTitleName] = useState("");
  const [genreList, setGenreList] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const files = formData.getAll("file");
    const mp3file = files[1];
    const [name, ex] = mp3file.name.split(".");
    const Key = `${name}_${new Date().toISOString()}.${ex}`;
    // console.log(formData.getAll("file"));

    // const s3Params = {
    //   Bucket: process.env.BUCKET_NAME,
    //   Key: Key,
    //   ContentType: file.type,
    //   Body: file,
    // };
    // const command = new PutObjectCommand(s3Params);
    // try {
    //   const data = await s3.send(command);
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={styles["form"]}>
        {/* ---------------Upload----------- */}
        <div className={styles["form__coverImage"]}>
          <label htmlFor="coverupload">
            <CoverImageIcon className={styles["form__label-upload--svg"]} />
          </label>
          <input
            id="coverupload"
            className={styles["form__input-upload"]}
            type="file"
            name="file"
          />
        </div>
        <div className={styles["form__audio"]}>
          <label htmlFor="upload">
            <UploadIcon className={styles["form__label-upload--svg"]} />
          </label>
          <input
            id="upload"
            className={styles["form__input-upload"]}
            type="file"
            name="file"
          />
        </div>
        {/* --------------------------------------------- */}
        <div className={styles["form__details"]}>
          <CustomInput
            placeholder="Enter title of music"
            onChange={(e) => setTitleName(e.target.value)}
            value={titleName}
          />
          <CustomInput
            placeholder="Enter Artist"
            onChange={(e) => setArtistName(e.target.value)}
            value={artistName}
          />
        </div>
        <div className={styles["form__genre"]}>
          <CustomInput
            placeholder="Enter Comma Separated Genre"
            onChange={(e) => setGenreList(e.target.value)}
            value={genreList}
          />
        </div>
        <Button type="submit">Upload</Button>
      </form>
    </>
  );
};

export default DesktopUpload;
