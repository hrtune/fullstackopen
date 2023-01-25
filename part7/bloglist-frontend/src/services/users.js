import axios from "axios";

const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(`loaded ${response.data.length} users`);
  return response.data;
};

const exports = {
  getAll,
};

export default exports;
