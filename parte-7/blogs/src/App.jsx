import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Layout } from "./layout/Layout";

const App = () => {
  return (
    <>
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
    </>
  );
};

export default App;
