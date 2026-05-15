import { useRef } from "react";
import { createContext, useContext, useReducer } from "react";

const notidicationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NoticationContextProvider = ({ children }) => {
  const [message, messageDispatch] = useReducer(notidicationReducer, "");
  const notificateRef = useRef();

  const setNotification = (msg, second) => {
    if (notificateRef.current) clearTimeout(notificateRef.current);

    messageDispatch({ type: "SET", payload: msg });
    notificateRef.current = setTimeout(() => {
      messageDispatch({ type: "SET", payload: "" });
    }, second * 1000);
  };

  return (
    <NotificationContext.Provider value={{ message, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const UseNotificationContext = () => {
  const notification = useContext(NotificationContext);

  if (!notification) throw new Error("Failed at context NotificationContext ");

  return {
    ...notification,
  };
};
