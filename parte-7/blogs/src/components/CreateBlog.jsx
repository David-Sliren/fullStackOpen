import { useCreateBlog } from "../hooks/useCreate";
import { useBlogStore } from "../store/blogStorage";

const CreateBlog = ({ handleClick }) => {
  const { blogCreated } = useCreateBlog();
  const { setNotification } = useBlogStore();

  async function handlerSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());

    try {
      await blogCreated.mutateAsync(values);
      setNotification("New blog created", 2);

      e.target.reset();
      handleClick();
    } catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <form
      onSubmit={handlerSubmit}
      className="text-neutral-800 py-6 relative overflow-hidden flex flex-col justify-around w-96 h-fit border border-neutral-500 rounded-lg bg-neutral-50 p-3 px-6"
    >
      <div className="before:absolute before:w-32 before:h-20 before:right-2 before:bg-rose-300 before:-z-10 before:rounded-full before:blur-xl before:-top-12 z-10 after:absolute after:w-24 after:h-24 after:bg-purple-300 after:-z-10 after:rounded-full after:blur after:-top-12 after:-right-6 mb-8">
        <span className="font-extrabold text-2xl text-violet-600">
          Create Blog
        </span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="relative rounded-lg w-64 overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
          <input
            type="text"
            className="relative bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
            placeholder="Title"
            name="title"
          />
        </div>
        <div className="relative rounded-lg w-64 overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
          <input
            type="text"
            className="relative bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
            placeholder="Author"
            name="author"
          />
        </div>
        <div className="relative rounded-lg w-64 overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
          <input
            type="text"
            className="relative bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
            placeholder="Link"
            name="url"
          />
        </div>
        <div className="relative rounded-lg w-64 overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
          <input
            type="text"
            className="relative bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
            placeholder="Likes"
            name="likes"
          />
        </div>
        <button
          type="submit"
          className="bg-violet-500 text-neutral-50 p-2 rounded-lg hover:bg-violet-400 cursor-pointer"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateBlog;
