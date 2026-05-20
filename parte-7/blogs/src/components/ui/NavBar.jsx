import { NavLink } from "react-router";
import { useUserStorage } from "../../store/userStorage";
import { InterateButton } from "./InterateButton";

export const NavBar = () => {
  const { user, handleLogout } = useUserStorage();
  return (
    <nav className="flex gap-2 items-center p-2 backdrop-blur-lg h-15 justify-between text-white">
      <div className="space-x-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-md font-semibold ${isActive && "border-b border-blue-500 text-blue-600"}`
          }
        >
          Blog
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `text-md font-semibold ${isActive && "border-b border-blue-500 text-blue-600"}`
          }
        >
          Users
        </NavLink>

        <NavLink
          to={user ? `/profile/${user.id}` : "/login"}
          className={({ isActive }) =>
            `text-md font-semibold ${isActive && "border-b border-blue-500 text-blue-600"}`
          }
        >
          {user ? "Profile" : "Login"}
        </NavLink>
      </div>

      {user && (
        <div className="space-x-2 flex items-center">
          <span>{user.userName}</span>
          <InterateButton handleClick={handleLogout} />
        </div>
      )}
    </nav>
  );
};
