import { Outlet } from "react-router";
import { NavBar } from "../components/ui/NavBar";
import { Notification } from "../components/ui/Notification";

export const Layout = () => {
  return (
    <div className="container min-h-svh w-full pb-10">
      <NavBar />
      <Notification />

      <main className="w-full h-full pt-10">
        <Outlet />
      </main>
    </div>
  );
};
