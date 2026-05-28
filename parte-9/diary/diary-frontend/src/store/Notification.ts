import { create } from "zustand";

type Notificate = {
  notification: string;
  updateNotification: (message: string) => void;
};

export const useNotification = create<Notificate>()((set) => ({
  notification: "",
  updateNotification: (notificate: string) => set({ notification: notificate }),
}));
