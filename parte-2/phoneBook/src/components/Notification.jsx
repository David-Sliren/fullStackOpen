import React from "react";

const Notification = ({ mesaage }) => {
  if (!mesaage) return null;

  return <div className="error">{mesaage}</div>;
};

export default Notification;
