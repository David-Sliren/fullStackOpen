import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services/login";
import { create } from "../services/blogs";
import { useBlogStore } from "../store/blogStorage";

export const UseLoginUser = () => {
  const { setNotification } = useBlogStore();
  const userLogin = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      setNotification("you do login", 4);
    },
  });

  return {
    userLogin,
  };
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  const blogCreated = useMutation({
    mutationFn: create,
    onSuccess: (blog) => {
      queryClient.setQueryData(["blogs"], (old) =>
        !old ? [blog] : [...old, blog],
      );
    },
  });

  return {
    blogCreated,
  };
};
