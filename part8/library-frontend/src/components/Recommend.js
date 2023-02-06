import BooksByGenre from "./BooksByGenre";

const Recommend = ({ show, user }) => {
  if (!show) {
    return null;
  }
  if (!user) {
    <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre: <strong>{user.favouriteGenre}</strong>
      </p>
      <BooksByGenre genre={user.favouriteGenre} />
    </div>
  );
};

export default Recommend;
