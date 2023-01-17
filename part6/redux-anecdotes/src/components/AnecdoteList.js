import { useSelector, useDispatch } from "react-redux";
import { voteToAnecdote } from "../reducers/anecdoteReducer";
import Notification from "./Notification";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteToAnecdote(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      {anecdotes.map((anecdote) => (
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
