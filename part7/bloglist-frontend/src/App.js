import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import {
  login,
  setUsername,
  setPassword,
  setUser,
} from "./reducers/loginReducer";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const { username, password, user } = useSelector((state) => state.login);

  // load all blogs
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  // load login information
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(`user ${user.username} has logged in`);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBloglistUser");
    dispatch(setUser(null));
  };

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog));
  };

  const LoginPage = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={notification.text} error={notification.error} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="login-username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => dispatch(setUsername(target.value))}
            />
          </div>
          <div>
            password
            <input
              id="login-password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => dispatch(setPassword(target.value))}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  const BlogPage = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={notification.text} error={notification.error} />
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel="new blog">
          <BlogForm handleCreate={handleCreate} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} owned={user.id === blog.user.id} />
        ))}
      </div>
    );
  };

  return user === null ? LoginPage() : BlogPage();
};

export default App;
