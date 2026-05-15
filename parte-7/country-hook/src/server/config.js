import axios from "axios";

const baseurl = "https://studies.cs.helsinki.fi/restcountries/api";

export const getAll = async () => {
  try {
    const response = await axios.get(`${baseurl}/all`);
    return await response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getCountry = async (countryName) => {
  try {
    const response = await axios.get(`${baseurl}/name/${countryName}`);
    const result = await response.data;
    return { data: { ...result }, found: true };
  } catch (error) {
    console.error(error.message);
    return { error: error.message, found: false };
  }
};
