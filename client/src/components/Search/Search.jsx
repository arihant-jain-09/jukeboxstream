import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import "./Search.scss";

const Search = () => {
  return (
    <div className="search">
      <div className="search__svg">
        <SearchIcon />
      </div>

      <input type="text" placeholder="Search for songs" />
    </div>
  );
};

export default Search;
