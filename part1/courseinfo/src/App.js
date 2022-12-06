const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
)

const Part = (props) => (
  <>
    <p>{props.part.name} {props.part.exercises}</p>
  </>
)

const Content = (props) => {
  const [p1, p2, p3] = props.parts
  return (
    <div>
      <Part part={p1} />
      <Part part={p2} />
      <Part part={p3} />
    </div>
  )
}

const Total = (props) => {
  const [p1, p2, p3] = props.parts
  const total = p1.exercises + p2.exercises + p3.exercises
  console.log("total is ", total)
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10
  }
  const part2 = {
    name: "Using props to pass data",
    exercises: 7
  }
  const part3 = {
    name: "State of a component",
    exercises: 14
  }

  const parts = [part1, part2, part3]
  
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App