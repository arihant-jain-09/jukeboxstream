import React, { useEffect, useState } from "react";
import "./App.scss";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "./components/Layout/Layout";
import axios from "axios";
import ImageGrid from "./components/ImageGrid/ImageGrid";

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

  console.log(items);

  return (
    <>
      <Layout {...props}>
        <ImageGrid items={items} />
      </Layout>
    </>
  );
};

export default withAuthenticator(App);
