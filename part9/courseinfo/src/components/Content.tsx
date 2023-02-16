import { CoursePart } from "../App";
import Part from "./Part";

const Content = ({ courses }: { courses: CoursePart[] }) => {
  return (
    <div>
      {courses.map((c) => (
        <p key={c.name}>
          <strong>
            {c.name} {c.exerciseCount}
          </strong>
          <Part part={c} />
        </p>
      ))}
    </div>
  );
};

export default Content;
