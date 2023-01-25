import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const initialState = {
  username: "",
  password: "",
  user: null,
};

const TIMEOUT = 2.5;

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

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername(state, action) {
      const username = action.payload;
      state.username = username;
      return state;
    },
    setPassword(state, action) {
      const password = action.payload;
      state.password = password;
      return state;
    },
    setUser(state, action) {
      const user = action.payload;
      state.user = user;
      return state;
    },
  },
});

export const { setUsername, setPassword, setUser } = loginSlice.actions;

export default loginSlice.reducer;
