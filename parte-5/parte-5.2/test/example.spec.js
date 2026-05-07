// @ts-check
import { test, expect } from "@playwright/test";
import { createBlog, loggin } from "../utils/helper";

const users = [
  {
    userName: "bubalu",
    name: "Sala",
    password: "papas180",
  },
  {
    userName: "bubalu2",
    name: "Salazar",
    password: "papas180",
  },
];

const newsBlogs = [
  {
    title: "Como hacer Test",
    author: "Andulce",
    url: "https://www.sngular.com/images/0/682/hero_l/playwright-blog-ok-V2-1439x411.png",
    likes: "400",
  },
  {
    title: "Como hacer arroz",
    author: "Sliren",
    url: "https://qestit.com/hubfs/Website/Blog%20photos/PH_blog_SE_playwright.png",
    likes: "300",
  },
  {
    title: "Como hacer un pan",
    author: "David",
    url: "https://testgrid.io/blog/wp-content/uploads/2024/06/playright-for-automation-testing.jpg",
    likes: "600",
  },
];

test.describe("test 5.17 : Blog app", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Login form is Shown", async ({ page }) => {
    // elements
    const login = page.getByText("Login");
    const username = page.getByText("Username");
    const password = page.getByText("Password");

    await expect(login).toBeVisible();
    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
  });
});

test.describe("test 5.18: Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await page.goto("/");
    await request.post("/api/test/reset");
    await request.post("/api/users", {
      data: {
        ...users[0],
      },
    });
  });

  test("cant to do loggin", async ({ page }) => {
    await loggin(page, users[0]);

    const logginUser = page.getByText(users[0].userName);

    await expect(logginUser).toBeVisible();
  });

  test("test case of error in the login", async ({ page }) => {
    // Elements
    const username = page.getByRole("textbox").first();
    const password = page.getByRole("textbox").last();
    const button = page.getByRole("button", { name: "Enviar" });

    // actions
    await username.fill(users[0].userName);
    await password.fill(users[0].password + "e");
    await button.click();

    const logginUser = page.getByText(users[0].userName);
    const message = page.locator(".incorrect");

    await expect(logginUser).not.toBeVisible();
    await expect(message).toBeVisible();
  });
});

test.describe("test 5.19: blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await page.goto("/");

    await request.post("/api/test/reset");

    await request.post("/api/users", {
      data: {
        ...users[0],
      },
    });

    await loggin(page, users[0]);
  });

  test("test about create a blog ", async ({ page }) => {
    await createBlog(page, newsBlogs[0]);

    const titleBlog = page.getByText(newsBlogs[0].title).first();
    const authorBlog = page.getByText(newsBlogs[0].author).first();

    await expect(titleBlog).toBeVisible();
    await expect(authorBlog).toBeVisible();
  });
});

test.describe("test 5.20: blog app", () => {
  test("You can edit the blog", async ({ page, request }) => {
    await page.goto("/");

    await loggin(page, users[0]);

    const titleBlog = page.getByText(newsBlogs[0].title).first();
    const authorBlog = page.getByText(newsBlogs[0].author).first();

    await expect(titleBlog).toBeVisible();
    await expect(authorBlog).toBeVisible();

    const viewButton = page.getByRole("button", { name: "view" });

    await viewButton.click();

    const containerMore = page.locator("#container-url-likes");

    await expect(containerMore).toBeVisible();

    const likes = page.getByTestId("like-blog");

    const getTextLikes = await likes.textContent();

    const [amountlikes] = getTextLikes?.match(/\d+/) || [];

    const aLikeMore = `${Number(amountlikes) + 1}`;

    await page.getByRole("button", { name: "Like" }).click();

    await expect(likes).toHaveText(new RegExp(aLikeMore));
  });
});

test.describe("test 5.21: blog app", () => {
  test("You can delete the blog", async ({ page, request }) => {
    await request.post("/api/test/reset");
    await request.post("/api/users", {
      data: {
        ...users[0],
      },
    });
    await page.goto("/");

    await loggin(page, users[0]);

    await createBlog(page, newsBlogs[0]);

    const titleBlog = page.getByText(newsBlogs[0].title).first();
    const authorBlog = page.getByText(newsBlogs[0].author).first();

    await expect(titleBlog).toBeVisible();
    await expect(authorBlog).toBeVisible();

    page.on("dialog", (dialog) => {
      console.log("dialog.message(): ", dialog.message());
      dialog.accept();
    });

    await page.getByRole("button", { name: "Delete" }).click();

    await expect(titleBlog).not.toBeVisible();
    await expect(authorBlog).not.toBeVisible();
  });
});

test.describe("test 5.22: blog app", () => {
  test("Create blog", async ({ page, request }) => {
    await request.post("/api/test/reset");
    await request.post("/api/users", {
      data: {
        ...users[0],
      },
    });
    await page.goto("/");

    await loggin(page, users[0]);

    await createBlog(page, newsBlogs[0]);

    const titleBlog = page.getByText(newsBlogs[0].title).first();
    const authorBlog = page.getByText(newsBlogs[0].author).first();

    await expect(titleBlog).toBeVisible();
    await expect(authorBlog).toBeVisible();
  });

  test("The creator can see the delete blog button.", async ({
    page,
    request,
  }) => {
    await request.post("/api/users", {
      data: {
        ...users[1],
      },
    });
    await page.goto("/");

    await loggin(page, users[1]);

    const deleteButton = page.getByRole("button", { name: "Delete" });

    await expect(deleteButton).not.toBeVisible();
  });

  test.afterEach(async ({ request }) => {
    await request.post("/api/test/reset");
  });
});

test.describe("test 5.23: blog app", () => {
  test("create blog 1", async ({ page, request }) => {
    await request.post("/api/test/reset");

    await request.post("/api/users", {
      data: {
        ...users[0],
      },
    });

    await page.goto("/");

    await loggin(page, users[0]);

    await expect(page.getByText(users[0].userName)).toBeVisible();

    await createBlog(page, newsBlogs[0]);
    await expect(page.getByText(newsBlogs[0].author)).toBeVisible();
  });

  test("create blog 2", async ({ page, request }) => {
    // await request.post("/api/test/reset");

    await request.post("/api/users", {
      data: {
        ...users[1],
      },
    });

    await page.goto("/");

    await loggin(page, users[1]);

    await expect(page.getByText(users[0].userName)).toBeVisible();

    await createBlog(page, newsBlogs[1]);
    await expect(page.getByText(newsBlogs[1].author)).toBeVisible();
  });

  test("create blog 3", async ({ page, request }) => {
    // await request.post("/api/test/reset");

    await request.post("/api/users", {
      data: {
        ...users[0],
      },
    });

    await page.goto("/");

    await loggin(page, users[0]);

    await expect(page.getByText(users[0].userName)).toBeVisible();

    await createBlog(page, newsBlogs[2]);
    await expect(page.getByText(newsBlogs[2].author)).toBeVisible();
  });

  test("blogs are sorted by likes", async ({ page }) => {
    await page.goto("/");
    const viewButtons = await page.getByText(/view/i).all();

    for (const view of viewButtons) {
      await view.click();
    }

    const likesBlog = await page.getByTestId("like-blog").all();

    const likes = [];

    for (const like of likesBlog) {
      const text = await like.textContent();
      const likeToNumber = Number(text?.match(/\d+/)[0]);
      likes.push(likeToNumber);
    }

    for (let i = 0; i < likes.length - 1; i++) {
      expect(likes[i]).toBeGreaterThanOrEqual(likes[i] + 1);
    }
  });
});
