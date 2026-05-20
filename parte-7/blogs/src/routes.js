import { createBrowserRouter } from "react-router";
import { Layout } from "./layout/Layout";
import { Blogs } from "./pages/Blogs";
import { Users } from "./pages/Users";
import { Logins } from "./pages/Logins";
import { Profile } from "./pages/Profile";
import Blog from "./pages/Blog";
import { NotFoundPage } from "./pages/Not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Blogs,
      },
      {
        path: "/users",
        Component: Users,
      },
      {
        path: "/login",
        Component: Logins,
      },
      { path: "/profile/:userId", Component: Profile },
      {
        path: "/blogs/:blogId",

        Component: Blog,
      },
    ],
  },
  { path: "*", Component: NotFoundPage },
]);
