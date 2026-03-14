import Content from "./Content";
import Headers from "./Headers";
import Total from "./Total";
import React from "react";

const Course = ({ course }) => {
  //   console.log(course);
  return (
    <div>
      {course.map((item) => {
        return (
          <div key={item.id}>
            <Headers text={item.name} />
            <Content parts={item.parts} />
            <Total amount={item.parts} />
          </div>
        );
      })}
    </div>
  );
};

export default Course;
