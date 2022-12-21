import Home from "../assets/home.svg";
import Trending from "../assets/trending.svg";
import Library from "../assets/library.svg";
import Liked from "../assets/love.svg";
import Favourite from "../assets/favourite.svg";
import Playlist from "../assets/playlist.svg";
import Profile from "../assets/profile.svg";
import Settings from "../assets/settings.svg";
import Logout from "../assets/logout.svg";

export const adminSideItems = [
  {
    MENU: [
      {
        Svg: Home,
        text: "Home",
        onClick: () => {
          console.log("clicked Home");
        },
      },
      { Svg: Trending, text: "Trending" },
      { Svg: Library, text: "Your Library" },
    ],
  },
  {
    "Your Collection": [
      { Svg: Liked, text: "Liked Songs" },
      { Svg: Favourite, text: "Favourite Artists" },
      { Svg: Playlist, text: "Playlist" },
    ],
  },
  {
    General: [
      { Svg: Profile, text: "Profile" },
      { Svg: Settings, text: "Favourite Artists" },
      { Svg: Logout, text: "Logout" },
    ],
  },
];
