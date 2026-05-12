import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { newNotification } from "../store/slices/notificationSlice";

export const Notification = () => {
  const notification = useSelector(({ notification }) => notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!notification) return;

    let timer = setTimeout(() => {
      dispatch(newNotification(""));
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: notification ? "block" : "none",
  };

  return <div style={style}>{notification}</div>;
};
