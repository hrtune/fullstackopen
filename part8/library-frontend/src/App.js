import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";
import { useApolloClient, useMutation, useSubscription } from "@apollo/client";
import {
  ADD_BOOK,
  BOOK_ADDED,
  ALL_BOOKS,
  ALL_GENRES,
  ALL_AUTHORS,
} from "./queries";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  if (query.query === ALL_BOOKS) {
    cache.updateQuery(query, (data) => {
      if (!data) {
        return;
      }
      const allBooks = data.allBooks;
      const allBooksId = allBooks.map((b) => b.id);
      return {
        allBooks: allBooksId.includes(addedBook.id)
          ? allBooks
          : allBooks.concat(addedBook),
      };
    });
  }

  if (query.query === ALL_GENRES) {
    const addedGenres = addedBook.genres;
    cache.updateQuery(query, ({ allGenres }) => {
      const genreSet = new Set(allGenres.concat(addedGenres));
      return {
        allGenres: Array.from(genreSet),
      };
    });
  }

  if (query.query === ALL_AUTHORS) {
    // this author object should include correct data
    const addedAuthor = addedBook.author;
    cache.updateQuery(query, ({ allAuthors }) => {
      // omit old author
      const otherAuthors = allAuthors.filter((a) => a.id !== addedAuthor.id);
      return {
        allAuthors: otherAuthors.concat(addedAuthor),
      };
    });
  }
};

const App = () => {
  const client = useApolloClient();
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  // queries and mutations
  const [addBook] = useMutation(ADD_BOOK);
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data);
      const book = data.data.bookAdded;
      window.alert(`Book added: ${book.title}`);
      updateCache(client.cache, { query: ALL_BOOKS }, book);
      updateCache(client.cache, { query: ALL_GENRES }, book);
      updateCache(client.cache, { query: ALL_AUTHORS }, book);
    },
  });

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

      <Books show={page === "books"} />

      <NewBook show={page === "add"} addBook={addBook} />

      <Recommend show={page === "recommend"} />

      <Login show={page === "login"} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
