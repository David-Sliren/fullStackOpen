import type { CoursePart } from "../types";
import { ErrorNever } from "../utils/ErrorNever";
import { Part } from "./Part";

interface Props {
  course: CoursePart[];
}

export const Content = ({ course }: Props) => {
  return (
    <div>
      {course.map((e, i) => {
        switch (e.kind) {
          case "basic":
            return <Part key={i} {...e} />;
          case "group":
            return <Part key={i} {...e} />;

          case "background":
            return <Part key={i} {...e} />;
          case "special":
            return <Part key={i} {...e} />;
          default:
            ErrorNever(e);
        }
      })}
    </div>
  );
};
