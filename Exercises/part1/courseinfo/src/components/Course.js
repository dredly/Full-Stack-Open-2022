const Header = (props) => (
    <h1>{props.course}</h1>
)

const Part = (props) => (
    <p>{props.name} {props.exercises}</p>
)

const Content = (props) => (
    props.parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises} />)
)

const Total = (props) => (
    <p>Total exercises: {props.parts.map(part => part.exercises).reduce((a, b) => a + b)}</p>
)

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course;