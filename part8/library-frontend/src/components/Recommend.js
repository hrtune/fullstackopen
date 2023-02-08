import BooksByGenre from "./BooksByGenre";
import { useQuery } from "@apollo/client";
import { ME } from "../queries";

const Recommend = ({ show }) => {
  const meQuery = useQuery(ME);

  if (!show) {
    return null;
  }

  if (meQuery.loading) {
    return <div>loading...</div>;
  }

  const user = meQuery.data.me;

  console.log(meQuery.data);

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
