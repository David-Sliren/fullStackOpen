import React from "react";
import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      {props.parts.map((item, i) => (
        <Part key={i} text={item.name} amount={item.exercises} />
      ))}
    </div>
  );
};

export default Content;
