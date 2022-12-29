import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import MP3 from "../../../components/Upload/mp3";
import {
  CustomInput,
  FormDetailsWrapper,
  FormGenreWrapper,
  UploadFileWrapper,
} from "../../../components/Upload/Upload";
import { UploadFormWrapper } from "../../../components/Upload/Upload";
import CoverImageIcon from "../../../assets/cover.svg";
import axios from "axios";
import Button from "../../../components/Button/button";
import { s3 } from "../../../utils/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const UploadPage = (props) => {
  const { data: session, status } = useSession();
  const [pageNum, setPageNum] = useState(1);
  const [artistName, setArtistName] = useState("");
  const [titleName, setTitleName] = useState("");
  const [genreList, setGenreList] = useState("");
  const [mp3, setMP3] = useState(null);
  const [cover, setCover] = useState(null);
  console.log(cover);
  console.log(mp3);
  if (status == "loading") {
    return <>...loading</>;
  }
  const groups = session.user.roles;
  if (groups && groups.find((e) => e === "admin")) {
    const handleSubmit = async (e) => {
      e.preventDefault();
      // const formData = new FormData(e.target);
      // const files = formData.getAll("file");
      // const mp3file = files[1];
      // const [name, ex] = mp3file.name.split(".");
      // const Key = `${name}_${new Date().toISOString()}.${ex}`;
      const genre = genreList.split(",").map((x) => {
        return { S: x.toString() };
      });
      try {
        const { data } = await axios.put("/api/entry", {
          id: { S: Date.now().toString() },
          title: { S: titleName },
          artist: { S: artistName },
          genre: { L: genre },
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
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
      <Layout {...props} isAdmin="true">
        <UploadFormWrapper handleSubmit={handleSubmit}>
          {pageNum == 1 && (
            <UploadFileWrapper
              id="coverupload"
              setState={setCover}
              pageNum={pageNum}
              setPageNum={setPageNum}
            />
          )}
          {pageNum == 2 && (
            <UploadFileWrapper
              id="upload"
              setState={setMP3}
              pageNum={pageNum}
              setPageNum={setPageNum}
            />
          )}
          {pageNum == 3 && (
            <>
              <FormDetailsWrapper>
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
              </FormDetailsWrapper>
              <div onClick={() => setPageNum(pageNum + 1)}>Next Page</div>
            </>
          )}
          {pageNum == 4 && (
            <FormGenreWrapper>
              <CustomInput
                placeholder="Enter Comma Separated Genre"
                onChange={(e) => setGenreList(e.target.value)}
                value={genreList}
              />
            </FormGenreWrapper>
          )}
          <Button type="submit">Upload</Button>
        </UploadFormWrapper>
      </Layout>
    );
  } else {
    return <div>Not an Admin</div>;
  }
};

export default UploadPage;
