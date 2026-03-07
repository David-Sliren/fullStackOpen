import Content from "./components/Content";
import Headers from "./components/Headers";
import Total from "./components/Total";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Headers text={course.name} />
      <Content parts={course.parts} />
      <Total amount={course.parts} />
    </div>
  );
};

export default App;
