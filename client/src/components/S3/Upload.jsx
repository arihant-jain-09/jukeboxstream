import React from "react";
import s3Client from "aws-sdk/clients/s3";
import axios from "axios";

const s3 = new s3Client({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_KEY,
  region: process.env.REACT_APP_REGION,
  signatureVersion: "v4",
});

const Test = () => {
  const Key = "carol_of_bells.mp3";
  const s3Params = {
    Bucket: process.env.REACT_APP_BUCKET_NAME,
    Key,
    Expires: 60,
    ContentType: "audio/mpeg",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("file");
    const uploadUrl = s3.getSignedUrl("putObject", s3Params);
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
