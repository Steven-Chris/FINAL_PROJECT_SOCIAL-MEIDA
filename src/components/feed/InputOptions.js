import React from "react";

import classes from "./InputOptions.module.css";

const InputOptions = ({ Icon, title, color }) => {
  return (
    <div className={classes.inputOptions}>
      <Icon style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  );
};

export default InputOptions;
