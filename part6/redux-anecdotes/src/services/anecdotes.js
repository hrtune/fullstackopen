import axios from "axios";
import { asObject } from "../reducers/anecdoteReducer";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const newAnecdote = asObject(content);
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const exports = { getAll, createNew };
export default exports;
