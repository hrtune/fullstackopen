import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      const users = action.payload;
      state = users;
      return state;
    },
    updateUser(state, action) {
      const newUser = action.payload;
      return state.map((u) => (u.id === newUser.id ? newUser : u));
    },
    addBlogToUser(state, action) {
      const blog = action.payload;
      const { title, author, url, id } = blog;
      return state.map((u) =>
        u.id === blog.user.id
          ? {
              ...u,
              blogs: u.blogs.concat({
                title,
                author,
                url,
                id,
              }),
            }
          : u
      );
    },
    removeBlogFromUser(state, action) {
      const blog = action.payload;
      const user = state.find((u) => u.id === blog.user.id);
      const newUser = {
        ...user,
        blogs: user.blogs.filter((b) => b.id !== blog.id),
      };
      return state.map((u) => (u.id === newUser.id ? newUser : u));
    },
  },
});

const { setUsers } = userSlice.actions;
export const { addBlogToUser, removeBlogFromUser } = userSlice.actions;

export default userSlice.reducer;
