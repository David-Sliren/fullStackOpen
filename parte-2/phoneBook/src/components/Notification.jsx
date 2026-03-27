import React from "react";

const Notification = ({ mesaage, isError }) => {
  if (!mesaage) return null;

  return <div className={isError ? "error" : "valid"}>{mesaage}</div>;
};

export default Notification;
