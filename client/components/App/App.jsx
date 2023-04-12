"use client";
import React, { useState } from "react";
import styles from "./App.module.scss";
// import Layout, { LayoutContentWrapper } from "../Layout/Layout";
import ImageGrid from "../ImageGrid/ImageGrid";
import Carousel from "../Carousel/Carousel";
import Header from "../Header/Header";
import Player from "../Player/Player";
import Filter from "../Filters/Filter";
import Sidebar from "../Sidebar/Sidebar";
import MusicPlayer from "../OOPS/MusicPlayer.js";
import MusicComponent from "../MusicComponent/MusicComponent";
import Notifications from "../Notifications/Notifications";
import { useSelector } from "react-redux";

const App = ({ items, ...props }) => {
  const player = new MusicPlayer(items);
  const [source, setSource] = useState(null);
  const { isPlaying, activeSong } = useSelector((state) => state.player);

  return (
    <div className={styles["app"]}>
      <div className={styles["layout"]}>
        <Sidebar {...props} />
        <div className={styles["layout__content-middle"]}>
          <Header />
          <Filter />
          <ImageGrid
            items={items}
            setSource={setSource}
            source={source}
            player={player}
          />
        </div>
        <div className={styles["layout__content-right"]}>
          <Notifications />
          {activeSong?.title && <MusicComponent />}
        </div>
      </div>

      {/* {source && (
        <Player
          source={source}
          poster="https://image.mux.com/3taBcOqKMfNG029QjBCJMKLviq13OrV6S/thumbnail.jpg"
          player={player}
        />
      )} */}
    </div>
  );
};

export default App;
