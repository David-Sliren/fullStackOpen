import { useEffect } from "react";
import { useNotification } from "../store/Notification";

export const Notification = () => {
  const { notification, updateNotification } = useNotification();

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      updateNotification("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [notification, updateNotification]);

  if (!notification) return null;

  return (
    <div className="toast">
      <div className="toast-content">{notification}</div>
      <div className="toast-icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d="M15.795 8.342l-5.909 9.545a1 1 0 0 1-1.628 0l-3.182-4.909a1 1 0 0 1 1.629-1.165l2.556 3.953L14.165 7.51a1 1 0 0 1 1.63 1.165z"></path>
        </svg>
      </div>
    </div>
  );
};
