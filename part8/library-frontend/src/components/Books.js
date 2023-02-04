import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_GENRES, ALL_BOOKS } from "../queries";

const Books = ({ show, query }) => {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("all");
  const allGenresQuery = useQuery(ALL_GENRES);
  const [loadBooks, booksResult] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (genre === "all") {
      loadBooks().then((result) => setBooks(result.data.allBooks));
    } else {
      loadBooks({
        variables: { genre },
      }).then((result) => setBooks(result.data.allBooks));
    }
  }, [genre, loadBooks]);

  if (!show) {
    return null;
  }

  if (booksResult.loading || allGenresQuery.loading) {
    return <div>loading...</div>;
  }

  // const books = query.data.allBooks;
  const allGenres = allGenresQuery.data.allGenres;

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{genre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => {
            return (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <p>genres:</p>
        {allGenres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre("all")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
