import React from "react";
import Search from "../Search/Search.jsx";
import Upload from "../Upload/Upload.jsx";
import { ReactComponent as NotificationIcon } from "../../assets/notification.svg";
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import "./Header.scss";
const Header = (props) => {
  const { signOut, user } = props;
  return (
    <>
      <div className="header">
        <div className="header-left">
          <Search />
        </div>
        <div className="header-right">
          <div className="header-right--icons">
            <SettingsIcon />
            <NotificationIcon />
          </div>
          <div className="header-right--image">
            <img src="/arihant_jain.jpg" alt="user" />
          </div>
          {props.isAdmin && <Upload />}
        </div>
      </div>
    </>
  );
};

export default Header;
