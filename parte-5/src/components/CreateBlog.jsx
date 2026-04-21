import { create } from "../services/blogs";

const CreateBlog = ({ username, handlerMessage, handlerCloseSesion }) => {
  async function handlerSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());

    try {
      await create(values);
      handlerMessage({
        info: "The blog was created successfully",
        isHidden: false,
        isCorrect: true,
      });
      e.target.reset();
    } catch (error) {
      handlerMessage(error);
    }
  }

  return (
    <form onSubmit={handlerSubmit}>
      <div>
        <h2>{username}</h2>
        <button onClick={handlerCloseSesion}>Cerrar sesion</button>
      </div>
      <hr />
      <span>Create new blog</span>
      <br />
      <hr />
      <label>Title</label>
      <input type="text" name="title" />
      <br />
      <br />
      <label>Author</label>
      <input type="text" name="author" />
      <br />
      <br />
      <label>Url</label>
      <input type="text" name="url" />
      <br />
      <br />

      <label>Likes</label>
      <input type="number" name="likes" min={0} />
      <br />
      <br />

      <button type="submit">Crear</button>
      <hr />
    </form>
  );
};

export default CreateBlog;
