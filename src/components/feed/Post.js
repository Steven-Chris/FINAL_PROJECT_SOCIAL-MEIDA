import { Avatar } from "@material-ui/core";
import React, { forwardRef, useEffect, useState } from "react";
import InputOptions from "../feed/InputOptions";
import classes from "./Post.module.css";

import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatOutlinedIcon from "@material-ui/icons/Chat";
import { db } from "../../firebase/firebase";
// import ShareOutlinedIcon from "@material-ui/icons/Share";
// import SendOutlinedIcon from "@material-ui/icons/Send";

const buttonData = [
  {
    title: "Likes",
    icon: FavoriteIcon,
    color: "gray",
  },
  // {
  //   title: "Comment",
  //   icon: ChatOutlinedIcon,
  //   color: "gray",
  // },
];
const Post = forwardRef(
  ({ id, likesCount, name, description, message, photoUrl }, ref) => {
    const [isLiked, setIsLiked] = useState(false);
    let [likeCount, setLikeCount] = useState(0);

    const likePost = () => {
      setIsLiked(!isLiked);
    };
    console.log(likesCount);

    //setting the like count
    useEffect(() => {
      if (isLiked) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
    }, [isLiked]);

    //sending like count to db
    useEffect(() => {
      db.collection("posts")
        .doc(id)
        .update({ likes: likeCount })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }, [isLiked]);

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
              onClick={likePost}
              Icon={data.icon}
              title={data.title}
              likedColor={isLiked}
            />
          ))}
          {likesCount > 0 && <p>{likesCount}</p>}
        </div>
      </div>
    );
  }
);

export default Post;
