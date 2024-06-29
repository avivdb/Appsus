export function NoteToDo({ note }) {
    const todoList = note.info.todo
    return (
        <ul className="note-todo">
            {todoList.map((todo, index) => (
                <li key={index}>
                    {todo}
                </li>
            ))}

        </ul>
    )
}