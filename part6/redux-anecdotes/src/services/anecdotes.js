import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const put = async (newAnecdote) => {
  const url = baseUrl + "/" + newAnecdote.id;
  const response = await axios.put(url, newAnecdote);
  return response.data;
};

const exports = { getAll, createNew, put };
export default exports;
