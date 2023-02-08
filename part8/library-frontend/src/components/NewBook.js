import { useState } from "react";
import { ALL_BOOKS, ALL_GENRES, ALL_AUTHORS } from "../queries";
import { updateCache } from "../App";

const NewBook = ({ show, addBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const deleteIcon = "x";

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log("add book...");

    addBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres,
      },
      onError: (error) => {
        console.log(error.graphQLErrors);
      },
      update: (cache, response) => {
        updateCache(cache, { query: ALL_BOOKS }, response.data.addBook);
        updateCache(cache, { query: ALL_GENRES }, response.data.addBook);
        updateCache(cache, { query: ALL_AUTHORS }, response.data.addBook);
      },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    if (genre && !genres.includes(genre)) {
      setGenres(genres.concat(genre));
    }
    setGenre("");
  };

  const deleteGenre = (genre) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((g) => g !== genre));
    }
  };

  return (
    <div>
      <h2>add book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>
          genres:
          {genres.map((g, i) => (
            <span key={i}>
              {g}
              <button
                type="button"
                style={{ fontSize: "9px" }}
                onClick={() => deleteGenre(g)}
              >
                {deleteIcon}
              </button>
              &nbsp;
            </span>
          ))}
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
