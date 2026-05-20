import React from "react";
import { Link } from "react-router";

export const User = ({ userName, blogs, id }) => {
  return (
    <Link
      to={`/profile/${id}`}
      className="w-fit p-2 flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl cursor-pointer text-black"
    >
      <span className="text-lg font-semibold">{userName}</span>

      <p className="text-sm font-normal">
        Blogs: <span className="font-normal">{blogs.length}</span>
      </p>
    </Link>
  );
};
