import { create } from "../services/blogs";

const CreateBlog = ({ handlerMessage, handlerIsOpen, handlerBlogs }) => {
  async function handlerSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());

    try {
      await create(values);

      handlerBlogs((item) => [...item, values]);

      handlerMessage({
        info: "The blog was created successfully",
        isHidden: false,
        isCorrect: true,
      });
      handlerIsOpen();
      e.target.reset();
    } catch (error) {
      handlerMessage({
        info: error,
        isHidden: false,
        isCorrect: false,
      });
    }
  }

  return (
    <form onSubmit={handlerSubmit}>
      <span>Create new blog</span>
      <br />
      <hr />
      <label>Title: </label>
      <input type="text" name="title" required />
      <br />
      <br />
      <label>Author: </label>
      <input type="text" name="author" required />
      <br />
      <br />
      <label>Url: </label>
      <input type="text" name="url" required />
      <br />
      <br />

      <label>Likes: </label>
      <input type="number" name="likes" min={0} />
      <br />
      <br />

      <button type="submit">Crear</button>
    </form>
  );
};

export default CreateBlog;
