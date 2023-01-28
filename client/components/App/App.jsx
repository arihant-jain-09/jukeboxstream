"use client";
import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Layout, { LayoutContentWrapper } from "../Layout/Layout";
import axios from "axios";
import ImageGrid from "../ImageGrid/ImageGrid";
import Carousel from "../Carousel/Carousel";
import Header from "../Header/Header";
import Player from "../Player/Player";
import { SetAllSongs } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

const App = (props) => {
  const [items, setItems] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/streams/all")
      .then(({ data }) => {
        setItems(data);
        dispatch(SetAllSongs(data));
      })
      .catch((e) => console.log(e));
    return () => {};
  }, []);

  const [source, setSource] = useState(null);

  return (
    <div className={styles["app"]}>
      <Layout {...props}>
        <Header />
        <ImageGrid items={items} setSource={setSource} source={source} />

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
