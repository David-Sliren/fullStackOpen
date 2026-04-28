import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import { getAll, setToken, deleteOne, update } from "./services/blogs";
import Login, { KEY_LOCALSTORAGE } from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import { Toggle } from "./components/ui/Toggle";
import { order } from "./utils/order";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [mesaage, setmessage] = useState({
    info: "",
    ishidden: true,
    isCorrect: false,
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, [mesaage]);

  useEffect(() => {
    const getStorage = localStorage.getItem(KEY_LOCALSTORAGE);

    if (!getStorage) return setUser(null);

    const user = JSON.parse(getStorage);

    setUser(user);
    setToken(user.token);
  }, []);

  useEffect(() => {
    let time;

    const closeMessage = () => {
      setmessage({
        info: "",
        ishidden: true,
        isCorrect: false,
      });
    };

    if (!mesaage.ishidden) {
      time = setTimeout(closeMessage, 4000);
    }

    return () => clearTimeout(time, closeMessage);
  }, [mesaage]);

  function handlerUser(data) {
    setUser(data);
  }

  function handlerMessage(data) {
    setmessage(data);
  }

  function handlerCloseSesion() {
    localStorage.removeItem(KEY_LOCALSTORAGE);
    setUser(null);
  }

  async function handlerDelete(id) {
    const permission = window.confirm(
      "Are you sure that you want deleted the blog?",
    );

    if (!permission) return;
    try {
      const newBlog = blogs.filter((item) => item.id !== id);
      setBlogs(newBlog);
      await deleteOne(id);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlerUpdateLike(blog) {
    try {
      const newBlog = {
        ...blog,
        likes: blog.likes + 1,
      };

      const updateBlogs = blogs.map((item) =>
        item.id === blog.id ? newBlog : item,
      );
      setBlogs(updateBlogs);

      await update(blog.id, newBlog);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="">
        <h1>App de Blogs</h1>
      </div>
      {!mesaage.ishidden && (
        <div
          className={`message ${mesaage.isCorrect ? "correct" : "incorrect"}`}
        >
          {mesaage.info}
        </div>
      )}
      {!user ? (
        <Login handler={handlerUser} handlerMessage={handlerMessage} />
      ) : (
        <>
          <div className="title">
            <h2>{user.userName}</h2>
            <button onClick={handlerCloseSesion}>Cerrar sesion</button>
          </div>
          <hr />
          <Toggle
            handlerMessage={handlerMessage}
            dataBlogs={blogs}
            handlerBlogs={setBlogs}
          />
        </>
      )}
      <h2>blogs</h2>
      {order(blogs).map((blog, i) => (
        <Blog
          key={i}
          blog={blog}
          handlerDelete={() => handlerDelete(blog.id)}
          handlerUpdateLike={() => handlerUpdateLike(blog)}
        />
      ))}
    </div>
  );
};

export default App;
