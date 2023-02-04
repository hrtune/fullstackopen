import { useState } from "react";

const Books = ({ show, query }) => {
  const [genre, setGenre] = useState("all");

  if (!show) {
    return null;
  }

  if (query.loading) {
    return <div>loading...</div>;
  }

  const books = query.data.allBooks;

  const allGenres = Array.from(
    new Set(books.reduce((arr, book) => arr.concat(book.genres), []))
  );

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
              return null;
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
