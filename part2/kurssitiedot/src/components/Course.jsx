const Header = ({ name }) => (
  <h1>{name}</h1>
)

const Content = ({ parts }) => (
  parts.map(part =>
    <Part key={part.id} part={part} />
  )

)

const Part = ({ part }) => (
  <p>{part.name} {part.exercises}</p>
)

const Total = ({ total }) => (
  <h3>total of {total} excercises</h3>
)

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  )
}

export default Course