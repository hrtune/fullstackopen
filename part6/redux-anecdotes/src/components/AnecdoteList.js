import { useSelector, useDispatch } from "react-redux";
import { voteToAnecdote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  deleteNotification,
} from "../reducers/notificationReducer";
import Notification from "./Notification";
import Filter from "./Filter";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const filterEngine = (anecdote) => {
    return anecdote.content.toLowerCase().includes(filter.toLowerCase());
  };
  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteToAnecdote(id));
    const anecdote = anecdotes.find((a) => a.id === id).content;
    dispatch(createNotification(`you voted '${anecdote}'`));

    // delete notification 5 seconds after
    setTimeout(() => {
      dispatch(deleteNotification());
    }, 5000);
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
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
