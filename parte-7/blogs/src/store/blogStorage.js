import { create } from "zustand";

const BlogStore = create((set) => ({
  notification: "",

  //   Methods
  setNotification: (message, second) => {
    set({ notification: message });

    const notificate = async () => {
      set({ notification: "" });
    };

    setTimeout(notificate, second * 1000);
  },
}));

export const useBlogStore = () => {
  const blogs = BlogStore((state) => state.blogs);
  const setNotification = BlogStore((state) => state.setNotification);
  const notification = BlogStore((state) => state.notification);

  return {
    blogs,
    notification,

    // methods
    setNotification,
  };
};
