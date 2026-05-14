import { UseNotificationContext } from "../context/NotificationContext";

const Notification = () => {
  const { message } = UseNotificationContext();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: "gray",
    display: message ? "block" : "none",
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
