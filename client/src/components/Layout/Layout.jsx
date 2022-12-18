import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.scss";

const Layout = (props) => {
  return (
    <div className="layout">
      <Sidebar signOut={props.signOut} />
      <div className="layout__content">
        <Header {...props} />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
