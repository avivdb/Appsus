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

    function removeNote(noteId) {
        notesService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => noteId !== note.id))
                showSuccessMsg('Note has been successfully removed!')
            })
            .catch(() => {
                showErrorMsg(`couldn't remove note`)
                navigate('/note')
            })
    }

    return (
        <section className="note-index">
            <NoteList notes={notes} onRemove={removeNote} />
        </section>
    )
}
