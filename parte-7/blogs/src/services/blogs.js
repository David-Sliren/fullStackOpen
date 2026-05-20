import axios from "axios";
import { userStorage } from "../store/userStorage";
const baseurl = "/api/blogs";

export const blogApi = axios.create({
  baseURL: "/api/blogs",
  headers: { Authorization: `Bearer ${userStorage.getState()?.user?.token}` },
});

blogApi.interceptors.request.use((config) => {
  const token = userStorage.getState().user?.token;

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export const getAll = async () => {
  const request = await axios.get(baseurl);
  return request.data;
};

export const getById = async (id) => {
  try {
    const request = await axios.get(`${baseurl}/${id}`);
    return request.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const create = async (newBlog) => {
  try {
    const { data } = await blogApi.post("/", newBlog);

    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || error.message);
  }
};

export const deleteOne = async (id) => {
  try {
    await blogApi.delete(`/${id}`);
  } catch (error) {
    throw new Error(error?.response?.data?.error || error.message);
  }
};

export const updateLike = async ({ id, newLike }) => {
  try {
    const { data } = await blogApi.patch(`/${id}/likes`, { likes: newLike });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || error.message);
  }
};

export const updateComment = async ({ id, text }) => {
  try {
    const { data } = await blogApi.patch(`/${id}/comments`, { text });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || error.message);
  }
};
