import React from "react";
import styles from "./button.module.scss";

const Button = ({ children, type }) => {
  return (
    <button type={type} className={styles["button"]}>
      {children}
    </button>
  );
};

export default Button;
