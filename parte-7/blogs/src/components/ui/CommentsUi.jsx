import React from "react";

export const CommentsUi = ({ text, user }) => {
  return (
    <div className="h-fit max-h-18 w-full bg-blue-300 rounded-xl p-2">
      <h4>{user}</h4>
      <p>{text}</p>
    </div>
  );
};
