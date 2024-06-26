import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { notesService } from "../services/note.service.js"

const { useEffect, useState } = React




export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(notesService.getDefaultFilter())

    useEffect(() => {
        notesService.query()
            .then(notes => setNotes(notes))
            .catch(err => console.log('error:', err))
    }, [])



    return (
        <section className="note-index">
            <NoteEdit />
            <NoteList notes={notes} />
        </section>
    )
}
