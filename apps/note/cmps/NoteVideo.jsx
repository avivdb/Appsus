export function NoteVideo({ note }) {
    return (
        <section className="note-video">
            <iframe src={note.info.videoUrl} frameBorder="0" allowFullScreen loop="1"></iframe>
        </section>
    )
}