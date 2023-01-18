import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNew = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(createNewAnecdote(content));
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(e) => createNew(e)}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
