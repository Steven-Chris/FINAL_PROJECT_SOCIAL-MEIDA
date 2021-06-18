import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};
// console.log(initialState.isAuthenticated);
const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("auth", true);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.setItem("auth", false);
    },
  },
});

export const { login, logout } = userSlice.actions;

// export const authState = (state) => state.isAuthenticated;
// export const userAuth = (state) => state.user.value;

export default userSlice;
