import { Avatar } from "@material-ui/core";
import React, { forwardRef, useEffect, useState } from "react";
import InputOptions from "../feed/InputOptions";
import classes from "./Post.module.css";

// import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ChatOutlinedIcon from "@material-ui/icons/Chat";
import { db } from "../../firebase/firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";

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
    const [likedList, setLikedList] = useState([]);
    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    const [userPostsId, setUserPostsId] = useState([]);

    const userDet = useSelector((state) => state.user.user);

    useEffect(() => {
      db.collection("posts")
        .doc(id)
        .onSnapshot((snap) => {
          setLikedList(snap.data()?.likedUsersId); //getting liked user array
        });

      db.collection("posts")
        .where("uid", "==", userDet.uid)
        .onSnapshot((snap) => {
          snap.forEach((doc) => {
            setUserPostsId((prev) => [...prev, doc.id]);
          });
        });
    }, [id]);

    const likePost = () => {
      if (!likedList.includes(userDet.uid)) {
        db.collection("posts")
          .doc(id)
          .update({
            likes: increment,
            likedUsersId: [...likedList, userDet.uid], //updating the post document
          });
      } else {
        //find index of uid and remove from the likedList
        const index = likedList.indexOf(userDet.uid);
        if (index > -1) {
          likedList.splice(index, 1);
        }

        //update db
        db.collection("posts")
          .doc(id)
          .update({
            likes: decrement,
            likedUsersId: [...likedList], //updating the post document
          });
      }
      // console.log(likesCount);
    };

    const deletePost = () => {
      db.collection("posts").doc(id).delete();
    };
    return (
      <div ref={ref} className={classes.post}>
        <div className={classes.post__header}>
          <div className={classes.leftgroup}>
            <Avatar src={photoUrl}></Avatar>
            <div className={classes.post__info}>
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
          </div>
          {userPostsId.includes(id) && (
            <HighlightOffIcon
              className={classes.deleteButton}
              onClick={deletePost}
            />
          )}
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
              likedColor={likesCount}
            />
          ))}
          {likesCount > 0 && <p>{likesCount}</p>}
        </div>
      </div>
    );
  }
);

export default Post;
