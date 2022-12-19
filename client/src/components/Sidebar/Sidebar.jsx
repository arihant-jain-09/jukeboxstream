import React from "react";
import "./Sidebar.scss";

const SidebarItem = ({ Svg, text, onClick }) => {
  return (
    <>
      <div className="sidebarItem" onClick={onClick}>
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

const Sidebar = ({ signOut, sideItems }) => {
  console.log(sideItems);
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__logo">
          <div className="sidebar__logo-img"></div>
          <div className="sidebar__logo-text">Streamify</div>
        </div>
        <div className="sidebar__content">
          {sideItems.map((item) => {
            const [key] = Object.keys(item);
            return (
              <div className="sidebar__content_item">
                <div className="sidebar__content-head">{key}</div>
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
