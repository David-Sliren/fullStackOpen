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

export const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const { data } = await axios.post(baseUrl, newBlog, config);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    await axios.delete(`${baseUrl}/${id}`, config);
  } catch (error) {
    console.log(error.message);
  }
};

export const update = async (id, newBlog) => {
  try {
    await axios.put(`${baseUrl}/${id}`, newBlog);
  } catch (error) {
    console.log(error.message);
  }
};
