import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, ME } from "../queries";
const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.message);
      setPassword("");
    },
    update: (cache, response) => {
      // We should update token before refetching ME query
      const token = response.data.login.value;
      localStorage.setItem("libraryUserToken", token);
      setToken(token);
      setUsername("");
      setPassword("");
      setPage("authors");
    },
    refetchQueries: [{ query: ME }],
  });

  const submit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>login page</h2>
      <form onSubmit={submit}>
        <label htmlFor="username">username</label>
        <input
          id="username"
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password">password</label>
        <input
          id="password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
