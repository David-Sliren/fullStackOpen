import React from "react";

const Total = ({ amount }) => {
  const amountTotal = amount.reduce((a, b) => {
    return a + b.exercises;
  }, 0);

  console.log(amountTotal);

  return <b>Total of {amountTotal} exercises </b>;
};

export default Total;
