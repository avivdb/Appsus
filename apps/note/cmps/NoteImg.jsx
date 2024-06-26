export function NoteImg({ note }) {
    return (
        <section className="note-img">
            <img src={note.info.imgUrl} alt="" />
        </section>
    )
}