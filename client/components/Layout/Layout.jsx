import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Layout.module.scss";

export const LayoutContentWrapper = ({ children }) => {
  return <div className={styles["layout__content-wrapper"]}>{children}</div>;
};
export const LayoutContentMiddle = ({ children }) => {
  <div className={styles["layout__content-middle"]}>{children}</div>;
};
export const LayoutContentRight = ({ children }) => {
  <div className={styles["layout__content-middle"]}>{children}</div>;
};
const Layout = (props) => {
  return (
    <div className={styles["layout"]}>
      <Sidebar {...props} />
      <LayoutContentWrapper>{props.children}</LayoutContentWrapper>
    </div>
  );
};

export default Layout;
