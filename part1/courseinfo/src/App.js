const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
)

const Part = (props) => (
  <>
    <p>{props.title} {props.point}</p>
  </>
)

const Content = (props) => (
  <div>
    <Part title={props.p1} point={props.ex1} />
    <Part title={props.p2} point={props.ex2} />
    <Part title={props.p3} point={props.ex3} />
  </div>
)
const Total = (props) => {
  const total = props.ex1 + props.ex2 + props.ex3
  console.log("total is ", total)
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content p1={part1} ex1={exercises3} p2={part2} ex2={exercises2} p3={part3} ex3={exercises3}/>
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    </div>
  )
}

export default App