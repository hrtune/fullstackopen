import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import "./App.css";

const TIMEOUT = 2500;

const Notification = ({ message, state }) => {
  if (!message) {
    return null;
  }

  return <div className={state}>{message}</div>;
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // load all blogs
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  // load login information
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(`user ${user.username} has logged in`);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      setUser(user);
      console.log(`user ${username} has logged in`);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("username or password is incorrect");
      setTimeout(() => setErrorMessage(""), TIMEOUT);
      console.log(exception.message);
      setPassword("");
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBloglistUser");
    setUser(null);
  };

  const handleCreate = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject);

      console.log(`blog ${blog.title} has created`);

      setBlogs(blogs.concat(blog).sort((a, b) => b.likes - a.likes));

      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => setSuccessMessage(""), TIMEOUT);
    } catch (exception) {
      setErrorMessage("something wrong with the new blog");
      setTimeout(() => setErrorMessage(""), TIMEOUT);
      console.log(exception.message);
    }
  };

  const loginPage = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={errorMessage} state="error" />
      <Notification message={successMessage} state="success" />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="login-username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="login-password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogPage = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} state="error" />
      <Notification message={successMessage} state="success" />
      <p>
        {user.name} logged in<button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog">
        <BlogForm handleCreate={handleCreate} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} owned={user.id === blog.user.id} />
      ))}
    </div>
  );

  return user === null ? loginPage() : blogPage();
};

export default App;
