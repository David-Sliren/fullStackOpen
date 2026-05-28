import axios from "axios";
import { Patient, PatientFormValues, Entry, NewEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getById = async (id: string) => {
  try {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new Error(error.response?.data);

    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (id: string, entry: NewEntry) => {
  try {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      entry,
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.error[0].message);
    }
    if (error instanceof Error) throw new Error(error.message);
  }
};

export default {
  getAll,
  create,
  getById,
  addEntry,
};
