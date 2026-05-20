import axios from "axios";

const userApi = axios.create({ baseURL: "/api/users" });

export const getUser = async () => {
  try {
    const response = await userApi.get("/");

    if (response.status !== 200) throw new Error("Failed on get users");

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserId = async (id) => {
  try {
    const response = await userApi.get(`/${id}`);

    if (response.status !== 200) throw new Error(`Failed on get user: ${id}`);

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
