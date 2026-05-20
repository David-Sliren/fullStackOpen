import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLike, updateComment } from "../services/blogs";

export const useUpdateLike = () => {
  const queryClient = useQueryClient();
  const UpdateLike = useMutation({
    mutationKey: ["like"],
    mutationFn: updateLike,
    onSuccess: (blog) => {
      queryClient.setQueryData(["blogs", blog.id], () => blog);
    },
  });

  return {
    UpdateLike,
  };
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  const comment = useMutation({
    mutationKey: ["comment"],
    mutationFn: updateComment,
    onSuccess: (blog) => {
      queryClient.setQueryData(["blogs", blog.id], (old) =>
        !old ? old : { ...old, comments: blog.comments },
      );
    },
  });

  return {
    comment,
  };
};
