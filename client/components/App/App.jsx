import React, { useEffect, useState } from "react";
import "./App.module.scss";
import Layout from "../Layout/Layout";
import axios from "axios";
import ImageGrid from "../ImageGrid/ImageGrid";
import Carousel from "../Carousel/Carousel";
import { userSideItems } from "../../utils/userSidebarImports";
import styles from "../Layout/Layout.module.scss";

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

  return (
    <>
      <Layout {...props} sideItems={userSideItems}>
        <div className={styles["layout__content-wrapper"]}>
          <ImageGrid items={items} />
        </div>

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
