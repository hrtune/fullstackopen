import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { useState } from "react";
import { initializeUsers } from "./reducers/userReducer";
import Header from "./components/Header";
import Blog from "./components/Blog";
import Users from "./components/Users";
import Notification from "./components/Notification";
import { login, getUserInfo } from "./reducers/loginReducer";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { Routes, Route } from "react-router-dom";
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
    return (
      <div>
        <Header />
        <Togglable buttonLabel="new blog">
          <BlogForm />
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} owned={user.id === blog.user.id} />
        ))}
      </div>
    );
  };

  const MainPage = () => (
    <div>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  );

  return <div>{user === null ? <LoginPage /> : <MainPage />}</div>;
};

export default App;
