import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

export const setToken = (allToken) => {
  token = `Bearer ${allToken}`;
};

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const create = (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const { data } = axios.post(baseUrl, newBlog, config);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
