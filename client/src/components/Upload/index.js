import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import {
  CustomInput,
  FormDetailsWrapper,
  FormGenreWrapper,
  UploadFileWrapper,
} from './Upload';
import { UploadFormWrapper } from './Upload';
import CoverImageIcon from '@/assets/cover.svg';
import axios from 'axios';
import Button from '../Button/button';
import { s3 } from '@/utils/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import styles from './Upload.module.scss';
import { POSTAPI } from '@/utils/callAPI';

const pageInfo = [
  {
    name: 'Upload Cover Image',
    required: {
      text: 'Files Supported',
      content: ['jpg'],
    },
  },
  {
    name: 'Upload Audio File',
    required: {
      text: 'Files Supported',
      content: ['mp3,.wav'],
    },
  },
  {
    name: 'Add title and artist name',
    required: {
      text: 'Form required Fields',
      content: ['Title', 'Artist'],
    },
  },
  {
    name: 'Add Genre',
    required: {
      text: 'Form required Fields',
      content: ['Genre'],
    },
  },
];

const StripperStatus = ({ pageNum, children, setPageNum }) => {
  const StripperComp = ({ children: compChildren, onClick }) => {
    return (
      <div
        className={`${
          pageNum == compChildren &&
          styles['upload--stripperStatus--left-pages-svg--selected']
        } ${styles['upload--stripperStatus--left-pages-svg']}`}
        onClick={onClick}
      >
        <span>{compChildren}</span>
      </div>
    );
  };
  return (
    <>
      <div className={styles['upload--stripperStatus']}>
        <div className={styles['upload--stripperStatus--left']}>
          <div className={styles['upload--stripperStatus--left-heading']}>
            {pageInfo[pageNum - 1]['name']}
          </div>
          <div className={styles['upload--stripperStatus--left-pages']}>
            <StripperComp onClick={() => setPageNum(1)}>1</StripperComp>
            <StripperComp onClick={() => setPageNum(2)}>2</StripperComp>
            <StripperComp onClick={() => setPageNum(3)}>3</StripperComp>
            <StripperComp onClick={() => setPageNum(4)}>4</StripperComp>
          </div>
        </div>
        <div className={styles['upload--stripperStatus--right']}>
          <div className={styles['upload--stripperStatus--right-title']}>
            {pageInfo[pageNum - 1]['required']['text']}
          </div>
          <div className={styles['upload--stripperStatus--right-content']}>
            {pageInfo[pageNum - 1]['required']['content'].map((item, idx) => (
              <div
                key={idx}
                className={
                  styles['upload--stripperStatus--right-content--chip']
                }
              >
                {pageInfo[pageNum - 1]['required']['content'][idx]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const UploadToS3 = async ({ url, formData }) => {
  console.log('url for upload', url);
  POSTAPI(url, formData, 'upload')
    .then((data) => {
      console.log(data);
    })
    .catch((e) => console.log(e));
  // await axios.post(url, formData, {
  //   headers: { "Content-Type": "multipart/form-data" },
  // });
};

const UploadPage = (props) => {
  const [pageNum, setPageNum] = useState(1);
  const [artistName, setArtistName] = useState('');
  const [titleName, setTitleName] = useState('');
  const [genreList, setGenreList] = useState('');
  const [music, setmusic] = useState(null);
  const [cover, setCover] = useState(null);
  const { backRoute } = props;
  console.log(music);
  // const AddToDynamoDB = async (folderName) => {
  //   const genre = genreList.split(",").map((x) => {
  //     return { S: x.toString() };
  //   });
  //   await axios.put("http://localhost:5000/api/upload/details", {
  //     id: { S: Date.now().toString() },
  //     title: { S: titleName },
  //     s3Name: { S: `${folderName}.webp` },
  //     artist: { S: artistName },
  //     genre: { L: genre },
  //     // createdAt: { N: Date.now().toString() },
  //   });
  // };

  const dynamoJSON = () => {
    const genre = genreList.split(',').map((x) => {
      return { S: x.toString() };
    });

    //Indian Timestamp
    let now = new Date();
    now.setTime(now.getTime() - now.getTimezoneOffset() * 60000);
    const timestamp = now.toISOString();
    return {
      timestamp: { S: timestamp },
      title: { S: titleName },
      artist: { S: artistName },
      genre: { L: genre },
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateFormat = new Date().toISOString();
    const musicex = music.name.substr(music.name.lastIndexOf('.'));
    let filemusic = music.slice(0, music.size);
    let newMusic = new File(
      [filemusic],
      `${titleName}_${dateFormat}${musicex}`,
      {
        type: `${music.type}`,
      }
    );
    let newCover;
    if (cover) {
      const coverex = cover.name.substr(cover.name.lastIndexOf('.'));
      let fileCover = cover.slice(0, cover.size);
      newCover = new File([fileCover], `${titleName}_${dateFormat}${coverex}`, {
        type: `${cover.type}`,
      });
    }
    const folderName = `${titleName}_${dateFormat}`;
    const formData = new FormData();
    // const musicformData = new FormData();
    formData.append('cover', newCover);
    if (cover) {
      formData.append('cover_path', `${folderName}/${newCover.name}`);
      formData.append('cover_name', `${newCover.name}`);
    }
    formData.append('music_path', `${folderName}/${newMusic.name}`);
    formData.append('music_name', `${newMusic.name}`);
    formData.append('music', newMusic);
    formData.append('dynamo', JSON.stringify(dynamoJSON()));
    console.log(formData);
    // Promise.all([
    //   UploadToS3({
    //     url: "http://localhost:5000/api/upload/music",
    //     formData: musicformData,
    //   }),
    //   AddToDynamoDB(folderName),
    //   cover &&
    //     UploadToS3({
    //       url: "http://localhost:5000/api/upload/cover",
    //       formData: formData,
    //     }),
    // ]).then((values) => {
    //   console.log(values);
    // });
    Promise.all([
      UploadToS3({
        url: backRoute,
        formData: formData,
      }),
    ]);
  };

  return (
    <Layout {...props}>
      <UploadFormWrapper handleSubmit={handleSubmit}>
        {pageNum == 1 && (
          <UploadFileWrapper
            id="coverupload"
            name="cover"
            setState={setCover}
            pageNum={pageNum}
            setPageNum={setPageNum}
            accept={'image/png, image/jpeg'}
          />
        )}
        {pageNum == 2 && (
          <UploadFileWrapper
            id="upload"
            name="music"
            setState={setmusic}
            pageNum={pageNum}
            setPageNum={setPageNum}
            accept={'audio/mpeg'}
          />
        )}
        {pageNum == 3 && (
          <div className={styles['uploadPage']}>
            <FormDetailsWrapper>
              <CustomInput
                onChange={(e) =>
                  setTitleName(e.target.value.split(' ').join('_'))
                }
                value={titleName}
              >
                Title
              </CustomInput>
              <CustomInput
                onChange={(e) =>
                  setArtistName(e.target.value.split(' ').join('_'))
                }
                value={artistName}
              >
                Artist
              </CustomInput>
            </FormDetailsWrapper>
            <Button
              type={'text'}
              onClick={() => setPageNum(pageNum + 1)}
              className={styles['uploadPage-nextPage']}
            >
              Next Page
            </Button>
          </div>
        )}
        {pageNum == 4 && (
          <>
            <div className={styles['uploadPage']}>
              <FormGenreWrapper>
                <CustomInput
                  placeholder="Enter Comma Separated Genre"
                  onChange={(e) => setGenreList(e.target.value)}
                  value={genreList}
                />
              </FormGenreWrapper>
              <Button type="submit" className={styles['uploadPage-nextPage']}>
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
};

export default UploadPage;
