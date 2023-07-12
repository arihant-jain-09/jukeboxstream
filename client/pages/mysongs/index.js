import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Filter from "../../components/Filters/Filter";
import ImageGrid from "../../components/ImageGrid/ImageGrid";
import Notifications from "../../components/Notifications/Notifications";
import MusicComponent from "../../components/MusicComponent/MusicComponent";
import { useSelector } from "react-redux";

const MySongs = (props) => {
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
            type="POST"
          />
        </div>
        <div className="layout__content-right">
          <Notifications />
          {activeSong?.title && <MusicComponent type="user" />}
        </div>
      </div>
    </div>
  );
};

export default MySongs;
