import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import classes from "./Sidebar.module.css";

const Sidebar = () => {
  const userDetails = useSelector((state) => state.user.user);

  return (
    <div className={classes.sidebar}>
      {/* SIDEBAR_PROFILE */}
      <div className={classes.sidebar__top}>
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          alt=""
        />
        <Avatar
          src={
            "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
          }
          className={classes.sidebar__avatar}
        ></Avatar>
        <h2>{userDetails.displayName}</h2>
        <h4>{userDetails.email}</h4>
        <p>{userDetails.bio}</p>
      </div>

      {/* SIDEBAR_COUNTS */}
      <div className={classes.sidebar__stats}>
        <div className={classes.sidebar__stat}>
          <p>Number of posts of post</p>
          <p className={classes.sidebar__statNumber}>50</p>
        </div>
        <div className={classes.sidebar__stat}>
          <p>Number of likes</p>
          <p className={classes.sidebar__statNumber}>2,540</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
