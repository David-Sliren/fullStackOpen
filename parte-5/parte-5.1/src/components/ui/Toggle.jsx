import React from "react";
import { useState } from "react";
import CreateBlog from "../CreateBlog";

export const Toggle = ({ handlerMessage, dataBlogs, handlerBlogs }) => {
  const [isOpen, setIsOpen] = useState(false);

  function handlerIsOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button
        style={{ display: !isOpen ? "block" : "none" }}
        onClick={handlerIsOpen}
      >
        Create new blog
      </button>
      <div style={{ display: isOpen ? "block" : "none" }}>
        <CreateBlog
          handlerMessage={handlerMessage}
          handlerIsOpen={handlerIsOpen}
          dataBlogs={dataBlogs}
          handlerBlogs={handlerBlogs}
        />
        <button onClick={handlerIsOpen}>Cancel</button>
      </div>
      <hr />
    </div>
  );
};
