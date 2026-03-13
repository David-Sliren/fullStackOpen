import { useState } from "react";
import Btn from "./components/Btn";
import Statistics from "./components/Statistics";

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function handleGood() {
    setGood(good + 1);
  }

  function handleNeutral() {
    setNeutral(neutral + 1);
  }

  function handleBad() {
    setBad(bad + 1);
  }

  return (
    <>
      <h1>give feedback</h1>
      <Btn title="good" handle={handleGood} />
      <Btn title="neutral" handle={handleNeutral} />
      <Btn title="bad" handle={handleBad} />

      <Statistics valueGood={good} valueNeutral={neutral} valueBad={bad} />
    </>
  );
};

export default App;
