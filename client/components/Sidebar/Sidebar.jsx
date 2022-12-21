import React from "react";
import styles from "./Sidebar.module.scss";

const SidebarItem = ({ Svg, text, onClick }) => {
  return (
    <>
      <div className={styles["sidebarItem"]} onClick={onClick}>
        <div className={styles["sidebarItem__svg"]}>
          <Svg />
        </div>
        <div className={styles["sidebarItem__text"]}>{text}</div>
      </div>
    </>
  );
};

const SidebarLogoutItem = ({ Svg, text, signOut }) => {
  return (
    <>
      <div className={styles["sidebarItem"]} onClick={signOut}>
        <div className={styles["sidebarItem__svg"]}>
          <Svg />
        </div>
        <div className={styles["sidebarItem__text"]}>{text}</div>
      </div>
    </>
  );
};

const Sidebar = ({ signOut, sideItems }) => {
  console.log(sideItems);
  return (
    <>
      <div className={styles["sidebar"]}>
        <div className={styles["sidebar__logo"]}>
          <div className={styles["sidebar__logo-img"]}></div>
          <div className={styles["sidebar__logo-text"]}>Streamify</div>
        </div>
        <div className={styles["sidebar__content"]}>
          {sideItems.map((item) => {
            const [key] = Object.keys(item);
            return (
              <div className={styles["sidebar__content_item"]}>
                <div className={styles["sidebar__content-head"]}>{key}</div>
                {item[key].map((item) => {
                  if (item.text === "Logout")
                    return <SidebarLogoutItem {...item} signOut={signOut} />;
                  else return <SidebarItem {...item} />;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
