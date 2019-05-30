import axios from "axios";

const url = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};
const createNew = async content => {
  const object = { content, votes: 0 };
  const response = await axios.post(url, object);
  return response.data;
};
const updateVote = async anecdote => {
  const object = {
    ...anecdote,
    votes: anecdote.votes + 1
  };
  const response = await axios.put(`${url}/${object.id}`, object);
  return response.data;
};

export default { getAll, createNew, updateVote };
