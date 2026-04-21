import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import { getAll, setToken } from "./services/blogs";
import Login, { KEY_LOCALSTORAGE } from "./components/Login";
import CreateBlog from "./components/CreateBlog";

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
        <CreateBlog
          username={user.userName}
          handlerMessage={handlerMessage}
          handlerCloseSesion={handlerCloseSesion}
        />
      )}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
