import React from 'react'

const Header = (props) => <h1>{props.name}</h1>

const Part = (props) => (
  <p>{props.name} {props.exercise}</p>
)

const Content = (props) => {
  console.log(props.parts)
  return (
    <div>
      <Part name={props.parts[0].name} exercise={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercise={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercise={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => <h1>Total exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</h1>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App