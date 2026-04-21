import axios from "axios";

const baseurl = "api/login";

export const login = async (credentials) => {
  try {
    const { data } = await axios.post(baseurl, credentials);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
