import React from "react";

import classes from "./InputOptions.module.css";

const InputOptions = ({ Icon, title, likedColor, onClick }) => {
  return (
    <div className={classes.inputOptions} onClick={onClick}>
      <Icon style={{ color: likedColor ? "red" : "gray" }} />
      <h4>{title}</h4>
    </div>
  );
};

export default InputOptions;
