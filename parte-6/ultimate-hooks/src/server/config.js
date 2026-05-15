import axios from "axios";
const baseUrl = "/api/notes";

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

export default { getAll, create };
