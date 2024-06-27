export function NoteTitle({ note }) {
    return (
        <h2>{note.info.title.toUpperCase()}</h2>
    )
}