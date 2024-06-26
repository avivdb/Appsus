export function NoteVideo({ note }) {
    return (
        <section className="note-video">
            <iframe src={note.info.videoUrl} width="140px" frameBorder="0"></iframe>
        </section>
    )
}