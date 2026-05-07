import { useState } from "react";

const Blog = ({ blog, handlerDelete, handlerUpdateLike, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  function handlerIsOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div data-testid="blog-principal">
      <div className="title">
        <h2 id="title-de-blog">{blog.title}</h2>
        <p id="author-de-blog">{blog.author}</p>
        <button id="btn-view-or-hiden-blog" onClick={handlerIsOpen}>
          {isOpen ? "Hidden" : "View"}
        </button>
        {user && user?.token && <button onClick={handlerDelete}>Delete</button>}
      </div>
      <div
        id="container-url-likes"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <img src={blog.url} alt={blog.title} width={300} />
        <br />
        <div>
          <span data-testid="like-blog">Likes {blog.likes} </span>
          <button id="btn-likes-blog" onClick={handlerUpdateLike}>
            Like
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Blog;
