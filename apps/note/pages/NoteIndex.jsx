import { notesService } from "../services/note.service.js"

const { useEffect } = React

useEffect(() => {
    notesService.query()
        .then(notes)
}, [])

export function NoteIndex() {

    return (
        <section className="note-index">
            note app
        </section>
    )
}
