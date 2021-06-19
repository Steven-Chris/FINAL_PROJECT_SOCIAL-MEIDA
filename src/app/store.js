import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import postSlice from "../features/postSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    like: postSlice.reducer,
  },
});

export default store;
