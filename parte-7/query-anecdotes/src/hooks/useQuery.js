import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVotes, getAnecdote, createAnecdote } from "../server/config";
import { UseNotificationContext } from "../context/NotificationContext";

export const useGetAnecdote = () => {
  const result = useQuery({
    queryKey: ["anecdote"],
    queryFn: getAnecdote,
    retry: 1,
  });

  return {
    result,
  };
};

export const useCreateAnecdote = () => {
  const queryClient = useQueryClient();
  const { setNotification } = UseNotificationContext();
  const newAnecdote = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdote"] }),
    onError: (data) =>
      setNotification(`${data.message} the min length is 5 characters`, 4),
  });

  return {
    newAnecdote,
  };
};

export const useAddVotes = () => {
  const queryClient = useQueryClient();

  const addVotes = useMutation({
    mutationFn: (id) => {
      const anecdotes = queryClient.getQueryData(["anecdote"]);
      const anecdote = anecdotes.find((an) => an.id === id);

      updateVotes({ ...anecdote, votes: anecdote.votes + 1 });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdote"] }),
  });

  return {
    addVotes,
  };
};
