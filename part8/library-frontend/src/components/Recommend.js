import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Recommend = ({ show, user }) => {
  const [loadBooks] = useLazyQuery(ALL_BOOKS);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (user) {
      loadBooks({ variables: { genre: user.favouriteGenre } }).then((result) =>
        setBooks(result.data.allBooks)
      );
    }
  }, [user, loadBooks]);

  if (!show) {
    return null;
  }

  if (!user) {
    <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
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
    </div>
  );
};

export default Recommend;
