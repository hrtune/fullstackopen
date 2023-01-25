import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  author: "",
  url: "",
};

const blogFormSlice = createSlice({
  name: "blogForm",
  initialState,
  reducers: {
    setTitle(state, action) {
      const title = action.payload;
      state.title = title;
      return state;
    },
    setAuthor(state, action) {
      const author = action.payload;
      state.author = author;
      return state;
    },
    setUrl(state, action) {
      const url = action.payload;
      state.url = url;
      return state;
    },
  },
});

export const { setTitle, setAuthor, setUrl } = blogFormSlice.actions;

export default blogFormSlice.reducer;
