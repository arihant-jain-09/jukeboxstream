import React from "react";
import { s3 } from "../../utils/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const Test = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("file");
    const [name, ex] = file.name.split(".");
    const Key = `${name}_${new Date().toISOString()}.${ex}`;
    console.log(file);

    const s3Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: Key,
      ContentType: file.type,
      Body: file,
    };
    const command = new PutObjectCommand(s3Params);
    try {
      const data = await s3.send(command);
      console.log(data);
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
