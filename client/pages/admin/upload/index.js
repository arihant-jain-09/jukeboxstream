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
import styles from "./upload.module.scss";

const pageInfo = [
  {
    name: "Upload Cover Image",
    required: {
      text: "Files Supported",
      content: ["jpg"],
    },
  },
  {
    name: "Upload Audio File",
    required: {
      text: "Files Supported",
      content: ["mp3"],
    },
  },
  {
    name: "Add title and artist name",
    required: {
      text: "Form required Fields",
      content: ["Title", "Artist"],
    },
  },
  {
    name: "Add Genre",
    required: {
      text: "Form required Fields",
      content: ["Genre"],
    },
  },
];

const StripperStatus = ({ pageNum, children, setPageNum }) => {
  const StripperComp = ({ children: compChildren, onClick }) => {
    return (
      <div
        className={`${
          pageNum == compChildren &&
          styles["upload--stripperStatus--left-pages-svg--selected"]
        } ${styles["upload--stripperStatus--left-pages-svg"]}`}
        onClick={onClick}
      >
        <span>{compChildren}</span>
      </div>
    );
  };
  return (
    <>
      <div className={styles["upload--stripperStatus"]}>
        <div className={styles["upload--stripperStatus--left"]}>
          <div className={styles["upload--stripperStatus--left-heading"]}>
            {pageInfo[pageNum - 1]["name"]}
          </div>
          <div className={styles["upload--stripperStatus--left-pages"]}>
            <StripperComp onClick={() => setPageNum(1)}>1</StripperComp>
            <StripperComp onClick={() => setPageNum(2)}>2</StripperComp>
            <StripperComp onClick={() => setPageNum(3)}>3</StripperComp>
            <StripperComp onClick={() => setPageNum(4)}>4</StripperComp>
          </div>
        </div>
        <div className={styles["upload--stripperStatus--right"]}>
          <div className={styles["upload--stripperStatus--right-title"]}>
            {pageInfo[pageNum - 1]["required"]["text"]}
          </div>
          <div className={styles["upload--stripperStatus--right-content"]}>
            {pageInfo[pageNum - 1]["required"]["content"].map((item, idx) => (
              <div
                className={
                  styles["upload--stripperStatus--right-content--chip"]
                }
              >
                {pageInfo[pageNum - 1]["required"]["content"][idx]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const UploadToS3 = async ({ Key, file, bucket }) => {
  const s3Params = {
    Bucket: bucket,
    Key: Key,
    ContentType: file.type,
    Body: file,
  };
  const command = new PutObjectCommand(s3Params);
  try {
    const data = await s3.send(command);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const UploadPage = (props) => {
  const { data: session, status } = useSession();
  const [pageNum, setPageNum] = useState(1);
  const [artistName, setArtistName] = useState("");
  const [titleName, setTitleName] = useState("");
  const [genreList, setGenreList] = useState("");
  const [mp3, setMP3] = useState(null);
  const [cover, setCover] = useState(null);
  console.log(mp3);
  if (status == "loading") {
    return <>...loading</>;
  }
  const groups = session.user.roles;

  if (groups && groups.find((e) => e === "admin")) {
    const AddToDynamoDB = async (folderName) => {
      const genre = genreList.split(",").map((x) => {
        return { S: x.toString() };
      });
      try {
        const { data } = await axios.put("/api/entry", {
          id: { S: Date.now().toString() },
          title: { S: titleName },
          s3Name: { S: `${folderName}.jpg` },
          artist: { S: artistName },
          genre: { L: genre },
        });
        return data;
      } catch (error) {
        return error;
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const dateFormat = new Date().toISOString();
      const mp3ex = mp3.name.substr(mp3.name.lastIndexOf("."));
      let fileMP3 = mp3.slice(0, mp3.size);
      let newMP3 = new File([fileMP3], `${titleName}_${dateFormat}${mp3ex}`, {
        type: `${mp3.type}`,
      });
      if (cover) {
        const coverex = cover.name.substr(cover.name.lastIndexOf("."));
        let fileCover = cover.slice(0, cover.size);
        let newCover = new File(
          [fileCover],
          `${titleName}_${dateFormat}${coverex}`,
          {
            type: `${mp3.type}`,
          }
        );
      }

      const folderName = `${titleName}_${dateFormat}`;
      Promise.all([
        UploadToS3({
          Key: newMP3.name,
          file: newMP3,
          bucket: process.env.BUCKET_NAME,
        }),
        AddToDynamoDB(folderName),
        cover &&
          UploadToS3({
            Key: `${folderName}/${newCover.name}`,
            file: cover,
            bucket: process.env.COVER_BUCKET_NAME,
          }),
      ]).then((values) => {
        console.log(values);
      });
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
              accept={"image/png, image/jpeg"}
            />
          )}
          {pageNum == 2 && (
            <UploadFileWrapper
              id="upload"
              setState={setMP3}
              pageNum={pageNum}
              setPageNum={setPageNum}
              accept={"audio/mpeg"}
            />
          )}
          {pageNum == 3 && (
            <div className={styles["uploadPage"]}>
              <FormDetailsWrapper>
                <CustomInput
                  onChange={(e) =>
                    setTitleName(e.target.value.split(" ").join("_"))
                  }
                  value={titleName}
                >
                  Title
                </CustomInput>
                <CustomInput
                  onChange={(e) =>
                    setArtistName(e.target.value.split(" ").join("_"))
                  }
                  value={artistName}
                >
                  Artist
                </CustomInput>
              </FormDetailsWrapper>
              <Button
                type={"text"}
                onClick={() => setPageNum(pageNum + 1)}
                className={styles["uploadPage-nextPage"]}
              >
                Next Page
              </Button>
            </div>
          )}
          {pageNum == 4 && (
            <>
              <div className={styles["uploadPage"]}>
                <FormGenreWrapper>
                  <CustomInput
                    placeholder="Enter Comma Separated Genre"
                    onChange={(e) => setGenreList(e.target.value)}
                    value={genreList}
                  />
                </FormGenreWrapper>
                <Button type="submit" className={styles["uploadPage-nextPage"]}>
                  Submit
                </Button>
              </div>
            </>
          )}
        </UploadFormWrapper>
        <StripperStatus
          pageNum={pageNum}
          setPageNum={setPageNum}
        ></StripperStatus>
      </Layout>
    );
  } else {
    return <div>Not an Admin</div>;
  }
};

export default UploadPage;
