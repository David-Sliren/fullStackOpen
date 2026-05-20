import React from "react";
import { order } from "../utils/order";
import { useGetBlogs } from "../hooks/useGetData";
import { BlogUi } from "../components/ui/BlogUi";
import CreateBlog from "../components/CreateBlog";
import { useUserStorage } from "../store/userStorage";
import { useState } from "react";
import { InterateButton } from "../components/ui/InterateButton";
import { Loader } from "../components/ui/Loader";
import { NotFound } from "../components/NotFound";

export const Blogs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isError, isLoading } = useGetBlogs();
  const { user } = useUserStorage();

  if (isError) return <NotFound />;

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-5 px-2">
      <div className="flex items-end gap-2">
        <h1 className="text-5xl font-bold text-white">Blogs</h1>
        {user && (
          <InterateButton
            handleClick={() => setIsOpen(!isOpen)}
            title={isOpen ? "Closed" : "Create Blog"}
          />
        )}
      </div>
      {user && isOpen && <CreateBlog handleClick={() => setIsOpen(!isOpen)} />}
      <div className="max-w-120 space-y-1.5">
        {order(data).map((bg) => (
          <BlogUi key={bg.id} id={bg.id} title={bg.title} />
        ))}
      </div>
    </div>
  );
};
