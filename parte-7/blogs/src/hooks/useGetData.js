import { useQuery } from "@tanstack/react-query";
import { getAll, getById } from "../services/blogs";
import { getUser, getUserId } from "../services/user";

export const useGetBlogs = () => {
  const blogs = useQuery({
    queryKey: ["blogs"],
    queryFn: getAll,
  });
  return {
    ...blogs,
  };
};

export const useGetUsers = () => {
  const user = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });

  return {
    ...user,
  };
};

export const useGetBlogId = (id) => {
  const blogId = useQuery({
    queryKey: ["blogs", id],
    queryFn: () => getById(id),
  });

  return {
    ...blogId,
  };
};

export const useGetUserId = (id) => {
  const user = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserId(id),
  });

  return {
    user,
  };
};
