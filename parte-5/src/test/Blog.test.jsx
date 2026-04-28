import { describe, test, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import CreateBlog from "../components/CreateBlog";

describe("Test to the blogs", () => {
  let container;

  const user = userEvent.setup();
  const mockHandler = vi.fn();

  const newBlog = {
    title: "Papas",
    author: "David Sliren",
    url: "https://slirendev.vercel.app/",
    likes: "200",
  };

  beforeEach(() => {
    container = render(
      <>
        <CreateBlog
          handlerBlogs={mockHandler}
          handlerMessage={mockHandler}
          handlerIsOpen={mockHandler}
        />
        <Blog blog={newBlog} handlerUpdateLike={mockHandler} />,
      </>,
    ).container;
  });

  test("check test 5.13", () => {
    const title = container.querySelector("#title-de-blog");
    const author = container.querySelector("#author-de-blog");

    expect(title).toHaveTextContent(newBlog.title);
    expect(author).toHaveTextContent(newBlog.author);
  });

  test("check test 5.14", async () => {
    const containerIsOpenBlog = container.querySelector("#container-url-likes");
    const handlerIsOpenBlog = container.querySelector(
      "#btn-view-or-hiden-blog",
    );

    // events
    await user.click(handlerIsOpenBlog);

    expect(containerIsOpenBlog).toHaveStyle("display: block");
  });

  test("check test 5.15", async () => {
    const btnLikes = container.querySelector("#btn-likes-blog");

    // events
    await userEvent.click(btnLikes);
    await userEvent.click(btnLikes);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test("chack test 5.16", async () => {
    const titleInput = container.querySelector("#title-blog");
    const authorInput = container.querySelector("#author-blog");
    const urlInput = container.querySelector("#url-blog");
    const likesInput = container.querySelector("#likes-blog");
    const submitButton = container.querySelector("#submit-button");

    // Events
    await user.type(titleInput, newBlog.title);
    await user.type(authorInput, newBlog.author);
    await user.type(urlInput, newBlog.url);
    await user.type(likesInput, newBlog.likes);
    await user.click(submitButton);

    expect(mockHandler.mock.calls[0]).toHaveLength(1);
  });
});
