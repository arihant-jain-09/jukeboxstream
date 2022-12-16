import React from "react";
import { s3 } from "./index";
import axios from "axios";

const Test = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("file");
    const [name, ex] = file.name.split(".");
    const Key = `${name}_${new Date().toISOString()}.${ex}`;
    const s3Params = {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key,
      Expires: 60,
      ContentType: file.type,
    };
    const uploadUrl = s3.getSignedUrl("putObject", s3Params);
    console.log(uploadUrl);
    try {
      await axios.put(uploadUrl, file);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" />
        <button type="submit">Upload</button>
      </form>
    </>
  );
};

export default Test;
