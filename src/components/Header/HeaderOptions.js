import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import classes from "./HeaderOptions.module.css";

const HeaderOptions = ({ avatar, Icon, title, onClick }) => {
  const userDetails = useSelector((state) => state.user.user);

  return (
    <div className={classes.headerOptions}>
      {Icon && <Icon className={classes.headerOptions__icon} />}
      {avatar && (
        <Avatar
          onClick={onClick}
          className={classes.headerOptions__icon}
          src={userDetails?.photoUrl}
        >
          {userDetails?.displayName[0]}
        </Avatar>
      )}
      <h3 className={classes.headerOptions__title}>{title}</h3>
    </div>
  );
};

export default HeaderOptions;
