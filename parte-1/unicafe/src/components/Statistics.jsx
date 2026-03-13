import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = (props) => {
  const sumAll = props.valueGood + props.valueNeutral + props.valueBad;

  const averageTotal = `${(
    (props.valueGood * 1 + props.valueNeutral * 0 + props.valueBad * -1) /
    sumAll
  ).toFixed(1)}%`;

  const positivePorcent = `${((props.valueGood / sumAll) * 100).toFixed(1)}%`;

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <StatisticLine text="good" value={props.valueGood} />
        <StatisticLine text="neutal" value={props.valueNeutral} />
        <StatisticLine text="bad" value={props.valueBad} />
        <StatisticLine text="all" value={sumAll} />
        <StatisticLine text="average" value={averageTotal} />
        <StatisticLine text="positive" value={positivePorcent} />
      </table>
    </>
  );
};

export default Statistics;
