const Header = (props) => (
  <>
    <h1>{props.course.name}</h1>
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
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App