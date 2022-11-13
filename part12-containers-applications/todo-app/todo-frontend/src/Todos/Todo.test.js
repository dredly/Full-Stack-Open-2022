import Todo from "./Todo"
import { render, screen } from '@testing-library/react'

test('renders content', () => {
    const exampleTodo = {
        text: "Learn kubernetes",
        done: false
    }
    const mockDoneInfo = (<p>DONE</p>)
    const mockNotDoneInfo = (<p>NOT DONE</p>)
    render(<Todo todo={exampleTodo} doneInfo={mockDoneInfo} notDoneInfo={mockNotDoneInfo}/>)
    const textElement = screen.getByText("Learn kubernetes")
    expect(textElement).toBeDefined()
})