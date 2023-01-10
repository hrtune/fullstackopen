import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = 'bearer ' + newToken
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(`loaded ${response.data.length} blogs`);
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const url = baseUrl + '/' + newBlog.id
  const response = await axios.put(url, newBlog, config)
  return response.data
}

const exports = {
  getAll,
  create,
  setToken,
  update
}

export default exports