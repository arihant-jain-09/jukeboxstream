import React from "react";
import "./App.scss";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "./components/Layout/Layout";

const App = (props) => {
  return (
    <>
      <Layout {...props}></Layout>
    </>
  );
};

export default withAuthenticator(App);
