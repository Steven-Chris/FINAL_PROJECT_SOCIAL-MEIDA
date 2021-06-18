import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import InputOptions from "../feed/InputOptions";
import classes from "./Post.module.css";

import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatOutlinedIcon from "@material-ui/icons/Chat";
// import ShareOutlinedIcon from "@material-ui/icons/Share";
// import SendOutlinedIcon from "@material-ui/icons/Send";

const buttonData = [
  {
    title: "Like",
    icon: ThumbUpAltOutlinedIcon,
    color: "gray",
  },
  {
    title: "Comment",
    icon: ChatOutlinedIcon,
    color: "gray",
  },
  // {
  //   title: "Share",
  //   icon: ShareOutlinedIcon,
  //   color: "gray",
  // },
  // {
  //   title: "Send",
  //   icon: SendOutlinedIcon,
  //   color: "gray",
  // },
];
const Post = forwardRef(({ name, description, message, photoUrl }, ref) => {
  return (
    <div ref={ref} className={classes.post}>
      <div className={classes.post__header}>
        <Avatar src={photoUrl}></Avatar>
        <div className={classes.post__info}>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className={classes.post__body}>
        <p>{message}</p>
      </div>

      <div className={classes.post__buttons}>
        {buttonData.map((data) => (
          <InputOptions
            Icon={data.icon}
            title={data.title}
            color={data.color}
          />
        ))}
      </div>
    </div>
  );
});

export default Post;
