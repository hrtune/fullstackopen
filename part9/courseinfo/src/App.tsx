import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

export interface Course {
  name: string;
  exerciseCount: number;
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: Course[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header text={courseName} />
      <Content courses={courseParts} />
      <Total
        number={courseParts.reduce((acc, c) => acc + c.exerciseCount, 0)}
      />
    </div>
  );
};

export default App;
