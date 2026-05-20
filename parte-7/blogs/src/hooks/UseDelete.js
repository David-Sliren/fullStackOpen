import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOne } from "../services/blogs";

export const UseDeleteBlog = () => {
  const queryClient = useQueryClient();

  const blogDelete = useMutation({
    mutationFn: deleteOne,
    onSuccess: (_data, variable) => {
      queryClient.setQueryData(["blogs"], (old) =>
        !old ? [] : old.filter((d) => d.id !== variable),
      );
    },
  });
  return {
    blogDelete,
  };
};
