import React from "react";
import styles from "./button.module.scss";

const Button = ({ children, type, onClick, className: cls }) => {
  return (
    <button
      type={type}
      className={`${styles["button"]} ${cls && cls}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
