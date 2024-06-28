import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { notesService } from "../services/note.service.js"
import { showErrorMsg } from '../../../services/event-bus.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { AddNote } from "../cmps/AddNote.jsx"

const { useEffect, useState } = React




export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(notesService.getDefaultFilter())
    const [isAdd, setIsAdd] = useState(false)
    // const [isEdit, setIsEdit] = useState(false);
    // console.log('filterBy', filterBy)

    useEffect(() => {
        notesService.query(filterBy)
            .then(notes => setNotes(notes))
            .catch(err => console.log('error:', err))
    }, [notes, filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }


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
            <NoteHeader filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

            {isAdd ? (
                <NoteEdit note={notesService.getEmptyNote()} setIsAdd={setIsAdd} />
            ) : (

                <AddNote setIsAdd={setIsAdd} />
            )}
            <NoteList notes={notes} removeNote={removeNote} setIsAdd={setIsAdd} />
        </section>
    )
}
