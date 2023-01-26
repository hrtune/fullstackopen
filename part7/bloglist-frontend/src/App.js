import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { useState } from "react";
import { initializeUsers } from "./reducers/userReducer";
import Header from "./components/Header";
import Blog from "./components/Blog";
import Users from "./components/Users";
import Notification from "./components/Notification";
import { login, getUserInfo, logout } from "./reducers/loginReducer";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { Routes, Route, Link } from "react-router-dom";
import User from "./components/User";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);

  // load all resources
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  // load login information
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (event) => {
      event.preventDefault();
      dispatch(login(username, password));
    };
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
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
  };

  const Blogs = () => {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: "solid",
      borderWidth: 1,
      marginBottom: 5,
    };
    return (
      <div>
        <Header />
        <Togglable buttonLabel="new blog">
          <BlogForm />
        </Togglable>
        {blogs.map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    );
  };

  const Navigation = () => {
    const navStyle = {
      background: "gray",
      height: "23px",
    };
    return (
      <div style={navStyle}>
        <p>
          <Link to="/">blogs</Link>|<Link to="/users">users</Link>|{user.name}{" "}
          logged in
          <button onClick={() => dispatch(logout())}>logout</button>
        </p>
      </div>
    );
  };

  const MainPage = () => (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );

  return <div>{user === null ? <LoginPage /> : <MainPage />}</div>;
};

export default App;
