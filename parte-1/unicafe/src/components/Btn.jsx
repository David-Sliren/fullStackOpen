import React from "react";

const Btn = ({ title, handle }) => {
  return <button onClick={handle}>{title}</button>;
};

export default Btn;
