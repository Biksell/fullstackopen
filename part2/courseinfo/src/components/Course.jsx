const Header = ({course}) => <h1>{course}</h1>

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part, id) => <Part key={id} part={part}/>)}
    </div>
  )
}

const Total = ({sum}) => <b>Number of exercises {sum}</b>

const Course = ({course}) => {
  const {id, name, parts} = course
  var total = course.parts.reduce((total, current) => total += current.exercises, 0)
  return (
    <div>
      <Header course={name} />
      <Content parts={parts}/>
      <Total sum={total}/>
    </div>
  )
}

export default Course
