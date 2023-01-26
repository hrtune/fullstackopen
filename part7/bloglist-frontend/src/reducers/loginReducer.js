import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const TIMEOUT = 2.5;

export const getUserInfo = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(`user ${user.username} has logged in`);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });

      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      dispatch(setUser(user));
      console.log(`user ${username} has logged in`);
    } catch (exception) {
      dispatch(
        setNotification("username or password is incorrect", TIMEOUT, true)
      );
      console.log(exception.message);
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBloglistUser");
    dispatch(setUser(null));
  };
};

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      state = user;
      return state;
    },
  },
});

export const { setUser } = loginSlice.actions;

export default loginSlice.reducer;
