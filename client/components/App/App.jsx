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

const App = (...props) => {
  const { isPlaying, activeSong } = useSelector((state) => state.player);

  return (
    <div className="app">
      <div className="layout">
        <Sidebar {...props} />
        <div className="layout__content-middle">
          <Header />
          <Filter />
          <ImageGrid
            apiRoute="http://localhost:5000/api/streams/all"
            type="GET"
          />
        </div>
        <div className="layout__content-right">
          <Notifications />
          {activeSong?.title && <MusicComponent />}
        </div>
      </div>
    </div>
  );
};

export default App;
