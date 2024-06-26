export function NoteTitle({ note }) {
    return (
        <h1>{note.info.title.toUpperCase()}</h1>
    )
}