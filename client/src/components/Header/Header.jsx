import React from "react";
import Search from "../Search/Search.jsx";
import Upload from "../Upload/Upload.jsx";
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
          {props.isAdmin && <Upload />}
          {/* <div className="header-right--image"></div>
          <div className="header-right--info">
            <div className="header-right--info-name">Arihant Jain</div>
            <div className="header-right--info-type">Premium</div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Header;
