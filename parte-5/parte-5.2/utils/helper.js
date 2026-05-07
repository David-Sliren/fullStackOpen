export const loggin = async (page, user) => {
  const username = page.getByRole("textbox").first();
  const password = page.getByRole("textbox").last();
  const button = page.getByRole("button", { name: "Enviar" });

  // actions
  await username.fill(user.userName);
  await password.fill(user.password);
  await button.click();
};

export const createBlog = async (page, newBlog) => {
  // components
  const titleInput = page.locator("#title-blog");
  const authorInput = page.locator("#author-blog");
  const urlInput = page.locator("#url-blog");
  const likesInput = page.locator("#likes-blog");

  // buttons
  const init = page.getByRole("button", { name: "Create new blog" });
  const submitButton = page.locator("#submit-button");

  // actions
  await init.click();
  await titleInput.fill(newBlog.title);
  await authorInput.fill(newBlog.author);
  await urlInput.fill(newBlog.url);
  await likesInput.fill(newBlog.likes);
  await submitButton.click();
};
