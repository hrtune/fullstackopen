import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState("all");

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  const allGenres = Array.from(
    new Set(books.reduce((arr, book) => arr.concat(book.genres), []))
  );

  console.log("all genres:", allGenres);

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
            if (!b.genres.includes(genre) && genre !== "all") {
              return <br />;
            }
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
