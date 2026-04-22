import { useState } from 'react'

const Blog = ({ blog, handlerDelete, handlerUpdateLike }) => {
  const [isOpen, setIsOpen] = useState(false)

  function handlerIsOpen() {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div className="title">
        <h2>{blog.title}</h2>
        <button onClick={handlerIsOpen}>{isOpen ? 'Hidden' : 'View'}</button>
        <button onClick={handlerDelete}>Delete</button>
      </div>
      <div style={{ display: isOpen ? 'block' : 'none' }}>
        <p>{blog.author}</p>

        <img src={blog.url} alt={blog.title} width={300} />
        <br />
        <div>
          <span>Likes {blog.likes} </span>
          <button onClick={handlerUpdateLike}>Like</button>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Blog
