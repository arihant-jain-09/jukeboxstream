import React, { useEffect, useState } from "react";
import "./App.scss";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "./components/Layout/Layout";
import axios from "axios";
import ImageGrid from "./components/ImageGrid/ImageGrid";
import Carousel from "./components/Carousel/Carousel";
import { userSideItems } from "./utils/userSidebarImports";

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
        <div className="layout__content-wrapper">
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

export default withAuthenticator(App);
