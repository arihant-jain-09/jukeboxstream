import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetAllSongs } from "../../redux/itemSlice";
import App from "./App";
import { useEffect } from "react";

const AppWrapper = (props) => {
  const [items, setItems] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/streams/all")
      .then(({ data }) => {
        data = data.map((item) => {
          return { ...item, duration: { S: "3:48" }, views: { S: "121k" } };
        });
        setItems(data);
        dispatch(SetAllSongs(data));
      })
      .catch((e) => console.log(e));
    return () => {};
  }, []);

  return <App {...props} items={items} />;
};

export default AppWrapper;
