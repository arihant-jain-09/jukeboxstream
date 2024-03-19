"use client";
import React from "react";
import MusicComponent from "@/components/MusicComponent/MusicComponent";
import Notifications from "@/components/Notifications/Notifications";
import styles from "./layout.module.scss";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Header from "@/components/Header/Header";
import Filter from "@/components/Filters/Filter";
import "@aws-amplify/ui-react/styles.css";

const RootLayout = ({ children, ...props }) => {
  return (
    <>
      <div className={styles["layout__content-middle"]}>
        <Header />
        <Filter />
        {children}
      </div>
      <div className={styles["layout__content-right"]}>
        <Notifications {...props} />
        <MusicComponent {...props} />
      </div>
    </>
  );
};
export default withAuthenticator(RootLayout);
