import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.scss";

const Layout = (props) => {
  return (
    <div className="layout">
      <Header {...props} />
      <Sidebar signOut={props.signOut} />
      <div className="layout__content">{props.children}</div>
    </div>
  );
};

export default Layout;
