import { CoursePart } from "../App";

const Description = ({ text }: { text: string }) => {
  return <em>{text}</em>;
};

const ProjectExercises = ({ count }: { count: number }) => {
  return <div>project exercises {count}</div>;
};

const SubmitTo = ({ url }: { url: string }) => {
  return <div>submit to {url}</div>;
};

const Requirements = ({ skills }: { skills: string[] }) => {
  return <div>required skills: {skills.join(", ")}</div>;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <Description text={part.description} />
        </div>
      );
    case "group":
      return (
        <div>
          <ProjectExercises count={part.groupProjectCount} />
        </div>
      );
    case "background":
      return (
        <div>
          <Description text={part.description} />
          <SubmitTo url={part.backgroundMaterial} />
        </div>
      );

    case "special":
      return (
        <div>
          <Description text={part.description} />
          <Requirements skills={part.requirements} />
        </div>
      );
    default:
      assertNever(part);
      return null;
  }
};

export default Part;
