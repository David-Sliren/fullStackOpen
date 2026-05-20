import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStorage = create(
  persist(
    (set) => ({
      user: null,

      handleLogin: (data) => set({ user: data }),
      handleLogout: () => set({ user: null }),
    }),
    {
      name: "session-user",
    },
  ),
);

export const useUserStorage = () => {
  const user = userStorage((state) => state.user);
  const { handleLogin, handleLogout } = userStorage();

  return {
    user,

    // methods
    handleLogin,
    handleLogout,
  };
};
