import React from "react";
import { useGetUserId } from "../hooks/useGetData";
import { useParams } from "react-router";
import { Link } from "react-router";
import { BlogUi } from "../components/ui/BlogUi";
import { Loader } from "../components/ui/Loader";
import { NotFound } from "../components/NotFound";

export const Profile = () => {
  const { userId } = useParams();
  const { user } = useGetUserId(userId);

  if (user.isError) return;
  if (user.isLoading) return <Loader />;

  return (
    <div className="size-full pt-10">
      <div className=" m-auto w-64 rounded-lg border-2 border-indigo-500 bg-transparent p-4 text-center shadow-lg dark:bg-gray-800">
        <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="currentColor"
            className="bi bi-person-fill text-white dark:text-indigo-300"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
          </svg>
          <figcaption className="sr-only">{user.data.userName}</figcaption>
        </figure>
        <h2 className="mt-4 text-xl font-bold text-indigo-600 dark:text-indigo-400">
          {user.data.userName}
        </h2>
        <p className="mt-4 text-xl font-bold text-indigo-600">
          Blogs {user.data.blogs.length}
        </p>
      </div>

      <div className="max-w-120 m-auto mt-8 space-y-1.5">
        {user.data.blogs.map((bg) => (
          <BlogUi key={bg.id} id={bg.id} title={bg.title} />
        ))}
      </div>
    </div>
  );
};
