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
  const dispatch = useDispatch();

  // useEffect(() => {
  // persist login
  // }, [])

  return (
    <div className="App">
      <Header />

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
