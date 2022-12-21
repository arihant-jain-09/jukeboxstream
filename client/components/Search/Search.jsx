import React from "react";
import SearchIcon from "../../assets/search.svg";
import styles from "./Search.module.scss";

const Search = () => {
  return (
    <div className={styles["search"]}>
      <div className={styles["search__svg"]}>
        <SearchIcon />
      </div>

      <input type="text" placeholder="Search for songs" />
    </div>
  );
};

export default Search;
