import React, { useEffect, useState } from "react";

import CreateIcon from "@material-ui/icons/Create";
// import ImageIcon from "@material-ui/icons/Image";
// import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
// import EventNoteIcon from "@material-ui/icons/EventNote";
// import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";

import classes from "./Feed.module.css";
import Post from "./Post";
import { db } from "../../firebase/firebase";

import firebase from "firebase";

import { useSelector } from "react-redux";
import FlipMove from "react-flip-move";

// const InputOptionsData = [
//   {
//     title: "Photo",
//     icon: ImageIcon,
//     color: "#70b5f9",
//   },
//   {
//     title: "Video",
//     icon: SubscriptionsIcon,
//     color: "#e7a33e",
//   },
//   {
//     title: "Event",
//     icon: EventNoteIcon,
//     color: "#c0cbcd",
//   },
//   {
//     title: "Write Article",
//     icon: CalendarViewDayIcon,
//     color: "#7fc15e",
//   },
// ];

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const user = useSelector((state) => state.user.user);

  const sendPost = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };
  useEffect(() => {
    db.collection("posts")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  console.log(posts);

  return (
    <div className={classes.feed}>
      <div className={classes.feed__inputContainer}>
        <div className={classes.feed__input}>
          <CreateIcon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Create a post!"
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        {/* <div className={classes.feed__inputOptions}>
          {InputOptionsData.map((options) => (
            <InputOptions
              title={options.title}
              Icon={options.icon}
              color={options.color}
            />
          ))}
        </div> */}
      </div>
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => {
          return (
            // <h1>post</h1>
            <Post
              key={id}
              name={name}
              description={description}
              message={message}
              photoUrl={photoUrl}
            />
          );
        })}
      </FlipMove>
    </div>
  );
};

export default Feed;
