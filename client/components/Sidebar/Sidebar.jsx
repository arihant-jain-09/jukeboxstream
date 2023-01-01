import { useRouter } from "next/router";
import React from "react";
import styles from "./Sidebar.module.scss";

import Home from "../../assets/home.svg";
import Trending from "../../assets/trending.svg";
import Library from "../../assets/library.svg";
import Liked from "../../assets/love.svg";
import Favourite from "../../assets/favourite.svg";
import Playlist from "../../assets/playlist.svg";
import Profile from "../../assets/profile.svg";
import Settings from "../../assets/settings.svg";
import Logout from "../../assets/logout.svg";
import Upload from "../../assets/upload.svg";

const SidebarItem = ({ Svg, text, onClick, selected }) => {
  return (
    <>
      <div
        className={`${selected && styles["sidebarItem--selected"]} ${
          styles["sidebarItem"]
        }`}
        onClick={onClick}
      >
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

const Sidebar = ({ signOut, isAdmin }) => {
  const router = useRouter();
  let sideItems;

  const userSideItems = [
    {
      MENU: [
        {
          Svg: Home,
          text: "Home",
          onClick: () => {
            console.log("clicked Home");
          },
          selected: router.pathname === "/",
        },
        {
          Svg: Trending,
          text: "Trending",
          selected: router.pathname === "/trending",
        },
        {
          Svg: Library,
          text: "Your Library",
          selected: router.pathname === "/library",
        },
      ],
    },
    {
      "Your Collection": [
        {
          Svg: Liked,
          text: "Liked Songs",
          selected: router.pathname === "/liked",
        },
        {
          Svg: Favourite,
          text: "Favourite Artists",
          selected: router.pathname === "/favourite",
        },
        {
          Svg: Playlist,
          text: "Playlist",
          selected: router.pathname === "/playlist",
        },
      ],
    },
    {
      General: [
        {
          Svg: Profile,
          text: "Profile",
          selected: router.pathname === "/profile",
        },
        {
          Svg: Settings,
          text: "Settings",
          selected: router.pathname === "/settings",
        },
        {
          Svg: Logout,
          text: "Logout",
          selected: router.pathname === "/logout",
        },
      ],
    },
  ];

  const adminSideItems = [
    {
      MENU: [
        {
          Svg: Home,
          text: "Home",
          onClick: () => {
            router.push("/admin");
          },
          selected: router.pathname === "/admin",
        },
        {
          Svg: Upload,
          text: "Upload",
          onClick: () => {
            router.push("/admin/upload");
          },
          selected: router.pathname === "/admin/upload",
        },
        {
          Svg: Library,
          text: "Your Library",
          selected: router.pathname === "/admin/library",
        },
      ],
    },
    {
      "Your Collection": [
        {
          Svg: Liked,
          text: "Liked Songs",
          selected: router.pathname === "/liked",
        },
        {
          Svg: Favourite,
          text: "Favourite Artists",
          selected: router.pathname === "/favourite",
        },
        {
          Svg: Playlist,
          text: "Playlist",
          selected: router.pathname === "/playlist",
        },
      ],
    },
    {
      General: [
        {
          Svg: Profile,
          text: "Profile",
          selected: router.pathname === "/profile",
        },
        {
          Svg: Settings,
          text: "Settings",
          selected: router.pathname === "/settings",
        },
        {
          Svg: Logout,
          text: "Logout",
          selected: router.pathname === "/logout",
        },
      ],
    },
  ];
  if (isAdmin) sideItems = adminSideItems;
  else sideItems = userSideItems;

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
