export function NoteToDo({ note }) {
    const todoList = note.info.todo
    return (
        <ul>
            {todoList.map((todo, index) => (
                <li key={index}>
                    {todo}
                </li>
            ))}

        </ul>
    )
}