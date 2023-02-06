import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_GENRES } from "../queries";
import BooksByGenre from "./BooksByGenre";

const Books = ({ show }) => {
  const [genre, setGenre] = useState("all");
  const allGenresQuery = useQuery(ALL_GENRES);

  if (!show) {
    return null;
  }

  if (allGenresQuery.loading) {
    return <div>loading...</div>;
  }

  const genres = allGenresQuery.data.allGenres;

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{genre}</strong>
      </p>
      <BooksByGenre genre={genre} />
      <div>
        <p>genres:</p>
        {genres.map((g) => (
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
