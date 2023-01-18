import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import Notification from "./Notification";
import Filter from "./Filter";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const filterEngine = (anecdote) => {
    return anecdote.content.toLowerCase().includes(filter.toLowerCase());
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      {anecdotes
        .filter((a) => filterEngine(a))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(vote(anecdote))}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
