import blogService from "../services/blogs";
import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";
import { addBlogToUser, removeBlogFromUser } from "./userReducer";

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
    dispatch(sortBlogs());
  };
};

const TIMEOUT = 2.5;

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);

      console.log(`blog ${newBlog.title} has created`);

      dispatch(addBlog(newBlog));
      dispatch(addBlogToUser(newBlog));
      dispatch(sortBlogs());

      dispatch(
        setNotification(
          `a new blog ${blog.title} by ${blog.author} added`,
          TIMEOUT,
          false
        )
      );
    } catch (exception) {
      dispatch(
        setNotification("something wrong with the new blog", TIMEOUT, true)
      );
      console.log(exception.message);
    }
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        const response = await blogService.remove(blog.id);
        if (response.status === 204) {
          console.log(`blog: ${blog.title} has been removed`);
        }
        dispatch(deleteBlog(blog.id));
        dispatch(removeBlogFromUser(blog));
        setNotification(`blog: ${blog.title} removed`, TIMEOUT);
      } catch (exeption) {
        setNotification("something wrong", TIMEOUT, true);
      }
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };

    try {
      const updatedBlog = await blogService.update(newBlog);
      console.log(
        `likes : ${blog.likes} -> ${updatedBlog.likes} (${blog.title})`
      );
      dispatch(
        updateBlog({
          ...updatedBlog,
          viewMode: blog.viewMode,
        })
      );
    } catch (exception) {
      console.log(exception.message);
    }
  };
};

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const blogs = action.payload;
      state = blogs.map((b) => ({
        ...b,
        viewMode: false,
      }));
      return state;
    },
    addBlog(state, action) {
      const blog = action.payload;
      return state.concat({
        ...blog,
        viewMode: false,
      });
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
    updateBlog(state, action) {
      const newBlog = action.payload;
      return state.map((b) => (b.id === newBlog.id ? newBlog : b));
    },
    likeBlog(state, action) {
      const id = action.payload;
      return state.map((b) =>
        b.id === id
          ? {
              ...b,
              like: b.like + 1,
            }
          : b
      );
    },
    changeView(state, action) {
      const id = action.payload;
      return state.map((b) =>
        b.id === id
          ? {
              ...b,
              viewMode: !b.viewMode,
            }
          : b
      );
    },
    sortBlogs(state, action) {
      state.sort((a, b) => b.likes - a.likes);
      return state;
    },
  },
});

export const { changeView } = blogSlice.actions;
const { setBlogs, addBlog, sortBlogs, deleteBlog, updateBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
