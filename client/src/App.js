import React, { useEffect, useState } from "react";
import "./App.scss";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "./components/Layout/Layout";
import axios from "axios";
import isEmpty from "lodash";

const App = (props) => {
  const [items, setItems] = useState([]);
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
      <Layout {...props}>
        <div className="app__content">
          <div className="app__content-item">
            {!isEmpty(items) && items[0].name}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default withAuthenticator(App);
