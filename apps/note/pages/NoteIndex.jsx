import { notesService } from "../services/note.service.js"

const { useEffect } = React



export function NoteIndex() {

    useEffect(() => {
        notesService.query()
            .then(notes => console.log('notes', notes))
    }, [])

    return (
        <section className="note-index">
            note app
        </section>
    )
}
