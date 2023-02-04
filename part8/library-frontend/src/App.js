import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";
import { useApolloClient, useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "./queries";

const App = () => {
  const client = useApolloClient();
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  const booksQuery = useQuery(ALL_BOOKS);
  const meQuery = useQuery(ME);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("login");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("libraryUserToken");
    if (!token && savedToken) {
      setToken(savedToken);
    }
  }, [token, setToken]);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} query={booksQuery} />

      <NewBook show={page === "add"} />

      <Recommend
        show={page === "recommend"}
        user={meQuery.data ? meQuery.data.me : null}
        booksQuery={booksQuery}
      />

      <Login show={page === "login"} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
