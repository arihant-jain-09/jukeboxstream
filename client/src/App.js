import React from "react";
import Header from "./components/Header/Header";
import "./App.scss";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Sidebar from "./components/Sidebar/Sidebar";

const App = (props) => {
  return (
    <div className="app">
      <Header {...props} />
      <Sidebar signOut={props.signOut} />
    </div>
  );
};

export default withAuthenticator(App);
