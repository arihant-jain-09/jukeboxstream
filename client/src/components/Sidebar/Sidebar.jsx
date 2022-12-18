import React from "react";
import "./Sidebar.scss";
import { ReactComponent as Home } from "../../assets/home.svg";
import { ReactComponent as Trending } from "../../assets/trending.svg";
import { ReactComponent as Library } from "../../assets/library.svg";
import { ReactComponent as Liked } from "../../assets/love.svg";
import { ReactComponent as Favourite } from "../../assets/favourite.svg";
import { ReactComponent as Playlist } from "../../assets/playlist.svg";
import { ReactComponent as Profile } from "../../assets/profile.svg";
import { ReactComponent as Settings } from "../../assets/settings.svg";
import { ReactComponent as Logout } from "../../assets/logout.svg";

const SidebarItem = ({ Svg, text }) => {
  return (
    <>
      <div className="sidebarItem">
        <div className="sidebarItem__svg">
          <Svg />
        </div>
        <div className="sidebarItem__text">{text}</div>
      </div>
    </>
  );
};
const SidebarLogoutItem = ({ Svg, text, signOut }) => {
  return (
    <>
      <div className="sidebarItem" onClick={signOut}>
        <div className="sidebarItem__svg">
          <Svg />
        </div>
        <div className="sidebarItem__text">{text}</div>
      </div>
    </>
  );
};

const Sidebar = ({ signOut }) => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__logo">
          <div className="sidebar__logo-img"></div>
          <div className="sidebar__logo-text">Streamify</div>
        </div>
        <div className="sidebar__content">
          <div className="sidebar__content_item">
            <div className="sidebar__content-head">MENU</div>
            <SidebarItem Svg={Home} text="Home" />
            <SidebarItem Svg={Trending} text="Trending" />
            <SidebarItem Svg={Library} text="Your Library" />
          </div>
          <div className="sidebar__content_item">
            <div className="sidebar__content-head">Your Collection</div>
            <SidebarItem Svg={Liked} text="Liked Songs" />
            <SidebarItem Svg={Favourite} text="Favourite Artists" />
            <SidebarItem Svg={Playlist} text="Playlist" />
          </div>
          <div className="sidebar__content_item">
            <div className="sidebar__content-head">General</div>
            <SidebarItem Svg={Profile} text="Profile" />
            <SidebarItem Svg={Settings} text="Favourite Artists" />
            <SidebarLogoutItem Svg={Logout} text="Logout" signOut={signOut} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
