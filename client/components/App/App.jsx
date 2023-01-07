"use client";
import React, { useEffect, useState } from "react";
import "./App.module.scss";
import Layout, { LayoutContentWrapper } from "../Layout/Layout";
import axios from "axios";
import ImageGrid from "../ImageGrid/ImageGrid";
import Carousel from "../Carousel/Carousel";
import styles from "../Layout/Layout.module.scss";
import Header from "../Header/Header";
import Player from "../Player/Player";

const App = (props) => {
  const [items, setItems] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/streams/all")
      .then(({ data }) => {
        setItems(data);
      })
      .catch((e) => console.log(e));
    return () => {};
  }, []);

  const [source, setSource] = useState(
    "http://localhost:3000/media/No_f-cking.m3u8"
  );

  return (
    <>
      <Layout {...props}>
        <Header />
        <ImageGrid items={items} setSource={setSource} source={source} />
        <Player
          source={source}
          poster="https://image.mux.com/3taBcOqKMfNG029QjBCJMKLviq13OrV6S/thumbnail.jpg"
        />

        {/* {items && (
          <Carousel
            items={items.map((item) => {
              return {
                title: item.title,
                cover: item.cover,
              };
            })}
          />
        )} */}
      </Layout>
    </>
  );
};

export default App;
