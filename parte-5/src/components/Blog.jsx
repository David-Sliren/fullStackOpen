const Blog = ({ blog }) => (
  <div>
    <h2>{blog.title}</h2>
    <p>{blog.author}</p>

    <img src={blog.url} alt={blog.title} width={300} />

    <div>Likes {blog.likes}</div>
    <hr />
  </div>
);

export default Blog;
