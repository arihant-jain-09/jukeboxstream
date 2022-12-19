import { ReactComponent as Home } from "../assets/home.svg";
import { ReactComponent as Trending } from "../assets/trending.svg";
import { ReactComponent as Library } from "../assets/library.svg";
import { ReactComponent as Liked } from "../assets/love.svg";
import { ReactComponent as Favourite } from "../assets/favourite.svg";
import { ReactComponent as Playlist } from "../assets/playlist.svg";
import { ReactComponent as Profile } from "../assets/profile.svg";
import { ReactComponent as Settings } from "../assets/settings.svg";
import { ReactComponent as Logout } from "../assets/logout.svg";

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
