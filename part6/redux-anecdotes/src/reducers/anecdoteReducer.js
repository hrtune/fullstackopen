import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
import { setNotification } from "./notificationReducer";
/*
const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
]; */

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (anecdoteContent) => {
  return async (dispatch) => {
    const anecdote = asObject(anecdoteContent);
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const vote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.put({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(updateAnecdote(newAnecdote));
    dispatch(setNotification(`you voted '${newAnecdote.content}'`, 5));
  };
};

const sortState = (state) => {
  return state.sort((a, b) => b.votes - a.votes);
};

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const anecdoteObject = action.payload;
      state.push(anecdoteObject);
      return sortState(state);
    },
    voteToAnecdote(state, action) {
      const id = action.payload;
      const newState = state.map((s) =>
        s.id === id
          ? {
              ...s,
              votes: s.votes + 1,
            }
          : s
      );

      return sortState(newState);
    },
    setAnecdotes(state, action) {
      return sortState(action.payload);
    },
    updateAnecdote(state, action) {
      const newAnecdote = action.payload;
      const id = newAnecdote.id;
      const newState = state.map((a) => (a.id === id ? newAnecdote : a));
      return sortState(newState);
    },
  },
});

export const { createAnecdote, updateAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
