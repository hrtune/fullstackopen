import { Course } from "../App";

interface Props {
  courses: Course[];
}

const Content = ({ courses }: Props) => {
  return (
    <div>
      {courses.map((c) => (
        <p key={c.name}>
          {c.name} {c.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
