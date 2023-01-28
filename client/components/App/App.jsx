"use client";
import React, { useState } from "react";
import styles from "./App.module.scss";
import Layout, { LayoutContentWrapper } from "../Layout/Layout";
import ImageGrid from "../ImageGrid/ImageGrid";
import Carousel from "../Carousel/Carousel";
import Header from "../Header/Header";
import Player from "../Player/Player";
import MusicPlayer from "../OOPS/MusicPlayer.js";

const App = ({ items, ...props }) => {
  const player = new MusicPlayer(items);
  const [source, setSource] = useState(null);

  return (
    <div className={styles["app"]}>
      <Layout {...props}>
        <Header />
        <ImageGrid
          items={items}
          setSource={setSource}
          source={source}
          player={player}
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
      {source && (
        <Player
          source={source}
          poster="https://image.mux.com/3taBcOqKMfNG029QjBCJMKLviq13OrV6S/thumbnail.jpg"
        />
      )}
    </div>
  );
};

export default App;
