import { useQuery } from "@tanstack/react-query";
import { getDiaries } from "../services";

export const useGetAllDiaries = () => {
  const getDairies = useQuery({
    queryKey: ["diaries"],
    queryFn: getDiaries,
    staleTime: 60 * 1000,
  });

  return { getDairies };
};
