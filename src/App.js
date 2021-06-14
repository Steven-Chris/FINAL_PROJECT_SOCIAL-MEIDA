import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Feed from "./components/feed/Feed";
import Header from "./components/Header/Header";
// import Login from "./components/Login";
import Sidebar from "./components/SideBar/Sidebar";
import { login, logout } from "./features/userSlice";
import { auth, db } from "./firebase/firebase";
import NewSignup from "./components/AUTH PAGE/NewSignup";
import NewLogin from "./components/AUTH PAGE/NewLogin";
import { Route, Switch } from "react-router-dom";

function App() {
  const authState = useSelector((state) => state.user.isAuthenticated);
  const [bio, setBio] = useState("");
  // const userDetails = useSelector(userAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //logged in user

        db.collection("users")
          .where("uid", "==", userAuth.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setBio(doc.data().bio);
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });

        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
            bio: bio,
          })
        );
      } else {
        //loggedOut
        dispatch(logout());
      }
    });
  });

  console.log(authState);
  return (
    <div className="App">
      <Header />
      {/* {!authState && <Login />} */}
      {/* {!authState && <NewSignup />} */}
      {/* {!authState && <NewLogin />} */}
      <Switch>
        {!authState && <Route path="/" exact component={NewSignup} />}
        {!authState && <Route path="/login" exact component={NewLogin} />}
      </Switch>

      {authState && (
        <div className="app__body">
          <Sidebar />
          <Feed />
        </div>
      )}
    </div>
  );
}

export default App;
