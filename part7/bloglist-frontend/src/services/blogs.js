import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = "bearer " + newToken;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(`loaded ${response.data.length} blogs`);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const url = baseUrl + "/" + newBlog.id;
  const response = await axios.put(url, newBlog, config);
  return response.data;
};

const addComment = async ({ blogId, comment }) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const url = baseUrl + `/${blogId}/comments`;
  const response = await axios.post(
    url,
    {
      comment,
    },
    config
  );
  return response.data;
};

const remove = async (blogId) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const url = baseUrl + "/" + blogId;
  const response = await axios.delete(url, config);
  return response;
};

const exports = {
  getAll,
  create,
  setToken,
  update,
  remove,
  addComment,
};

export default exports;
