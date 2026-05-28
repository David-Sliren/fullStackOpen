import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

export const getDaignosesApi = async () => {
  try {
    const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    return data;
  } catch (error) {
    {
      if (axios.isAxiosError(error)) throw new Error(error.response?.data);

      if (error instanceof Error) throw new Error(error.message);
    }
  }
};
