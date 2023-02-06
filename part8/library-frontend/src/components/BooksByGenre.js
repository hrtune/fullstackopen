import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
const BooksByGenre = ({ genre }) => {
  const booksQuery = useQuery(
    ALL_BOOKS,
    genre === "all"
      ? undefined
      : {
          variables: {
            genre,
          },
        }
  );

  if (booksQuery.loading) {
    return <div>loading...</div>;
  }

  const books = booksQuery.data.allBooks;

  return (
    <div>
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

export default BooksByGenre;
