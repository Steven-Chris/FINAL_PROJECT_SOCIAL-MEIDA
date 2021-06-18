import React from "react";

import classes from "./Header.module.css";

import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
// import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
// import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
// import ChatIcon from "@material-ui/icons/Chat";
// import NotificationsIcon from "@material-ui/icons/Notifications";

import HeaderOptions from "./HeaderOptions";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import { auth } from "../../firebase/firebase";

const HeaderOptionsData = [
  {
    title: "Home",
    icon: HomeIcon,
  },
  {
    title: "Find People",
    icon: SearchIcon,
  },
  // {
  //   title: "Jobs",
  //   icon: BusinessCenterIcon,
  // },
  // {
  //   title: "Messaging",
  //   icon: ChatIcon,
  // },
  // {
  //   title: "Notifications",
  //   icon: NotificationsIcon,
  // },
];

const Header = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.user);
  const authState = useSelector((state) => state.user.isAuthenticated);

  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };
  return (
    <div className={classes.header}>
      <div className={classes.header__left}>
        {/* <img
          src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg"
          alt=""
        /> */}
        <h2>Twittagram</h2>
        {/* 
        <div className={classes.header__search}>
          <SearchIcon />
          <input placeholder="search" type="text" />
        </div> */}
      </div>

      {authState && (
        <div className={classes.header__right}>
          {/* {HeaderOptionsData.map((data) => (
            <HeaderOptions Icon={data.icon} title={data.title} />
          ))} */}
          <HeaderOptions
            onClick={logoutOfApp}
            avatar={userDetails.photoUrl}
            title={userDetails ? userDetails.displayName : "Please Login"}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
