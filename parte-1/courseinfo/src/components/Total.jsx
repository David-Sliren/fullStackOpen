import React from "react";

const Total = (props) => {
  const amountTotal =
    props.amount[0].exercises +
    props.amount[1].exercises +
    props.amount[2].exercises;

  return <p>Number of exercises {amountTotal}</p>;
};

export default Total;
