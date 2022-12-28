import React from "react";
import Search from "../Search/Search.jsx";
import Upload from "../Upload/Upload.jsx";
import NotificationIcon from "../../assets/notification.svg";
import SettingsIcon from "../../assets/settings.svg";
import styles from "./Header.module.scss";
const Header = (props) => {
  const { signOut, user } = props;
  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["header-left"]}>
          <Search />
        </div>
        <div className={styles["header-right"]}>
          <div className={styles["header-right--icons"]}>
            <SettingsIcon />
            <NotificationIcon />
          </div>
          <div className={styles["header-right--image"]}>
            <img src="/arihant_jain.jpg" alt="user" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
