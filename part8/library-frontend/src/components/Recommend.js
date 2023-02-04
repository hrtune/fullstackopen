const Recommend = ({ show, user, booksQuery }) => {
  if (!show) {
    return null;
  }
  if (booksQuery.loading || !user) {
    return <div>loading...</div>;
  }

  const genre = user.favouriteGenre;
  const books = booksQuery.data.allBooks;

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
            if (!b.genres.includes(genre)) {
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
    </div>
  );
};

export default Recommend;
