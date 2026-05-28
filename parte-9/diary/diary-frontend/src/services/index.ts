import axios from "axios";
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from "../types/types";

const diaries = axios.create({
  baseURL: "/api",
});

export const getDiaries = async () => {
  try {
    const response = await diaries.get<NonSensitiveDiaryEntry[]>("/diaries");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response?.data;
    if (error instanceof Error) throw error.message;
  }
};

export const createDiaries = async (data: NewDiaryEntry) => {
  try {
    const res = await diaries.post<NewDiaryEntry>("/diaries", data);
    if (res.status !== 200) throw new Error("hubo un error");

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response?.data;

    if (error instanceof Error) throw error.message;
  }
};
