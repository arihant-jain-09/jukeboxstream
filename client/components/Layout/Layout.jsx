import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <div className={styles["layout"]}>
      <Sidebar {...props} />
      <div className={styles["layout__content"]}>
        <Header {...props} />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
