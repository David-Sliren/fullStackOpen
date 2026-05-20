import { useParams } from "react-router";
import { useGetBlogId } from "../hooks/useGetData";
import { BackButton } from "../components/ui/BackButton";
import { DeleteButton } from "../components/ui/DeleteButton";
import { useUpdateLike } from "../hooks/useUpdate";
import { useBlogStore } from "../store/blogStorage";
import { Comment } from "../components/ui/Comment";
import { useState } from "react";
import { CommentsUi } from "../components/ui/CommentsUi";
import { Loader } from "../components/ui/Loader";
import { NotFound } from "../components/NotFound";

const Blog = () => {
  const { blogId } = useParams();
  const { setNotification } = useBlogStore();

  const { data: blog, isError, isLoading } = useGetBlogId(blogId);
  const { UpdateLike } = useUpdateLike();

  const [addComment, setAddComent] = useState(false);

  function handleAddComent() {
    setAddComent(!addComment);
  }

  function handlerUpdateLike() {
    UpdateLike.mutate({
      id: blog.id,
      newLike: blog.likes + 1,
    });

    setNotification("You give like", 2);
  }

  if (isError) return <NotFound />;

  if (isLoading) return <Loader />;

  return (
    <section className="relative flex justify-center items-center h-full w-full">
      <div className="relative flex w-250 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600 flex justify-between pr-2">
          <BackButton />
          <DeleteButton id={blogId} />
        </div>

        <div className="p-6">
          <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {blog.title}
          </h5>
          <div className="relative h-40 aspect-video  rounded-xl bg-gray-400 bg-clip-border text-white shadow-lg overflow-hidden">
            <img className="size-full" src={blog?.url} alt={blog.title} />
          </div>
          <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
            {blog.author}
          </p>
          <div className="flex gap-5 mt-2">
            <span className="block font-sans text-base font-semibold leading-relaxed text-inherit antialiased">
              Likes: {blog.likes}
            </span>
            <span className="block font-sans text-base font-semibold leading-relaxed text-inherit antialiased">
              Comments: {blog.comments.length}
            </span>
          </div>
        </div>
        <div className="space-x-2 p-6 pt-0">
          <button
            onClick={handlerUpdateLike}
            data-ripple-light="true"
            type="button"
            className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
          >
            Like
          </button>
          <button
            onClick={handleAddComent}
            data-ripple-light="true"
            type="button"
            className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
          >
            Comment
          </button>
        </div>
        <div
          className={` transition-all ease-in-out ${
            addComment
              ? " translate-y-0 scale-100 opacity-100 pointer-events-auto"
              : " -translate-y-20 scale-75 opacity-0 pointer-events-none"
          }`}
        >
          <Comment id={blogId} handleClick={handleAddComent} />
        </div>
        <div className="absolute right-10 top-40  space-y-1.5 w-110 h-80 bg-zinc-500/20 p-2 rounded-xl overflow-x-hidden">
          {blog.comments.map((bg) => (
            <CommentsUi {...bg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
