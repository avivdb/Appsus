export function NotePreview({ note }) {

    return (
        <section className="note-preview" style={note.style}>
            <h3>{note.info.txt}</h3>
            <img src={note.info.imgUrl} alt="" />
        </section>
    )
}