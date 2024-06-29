
import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { notesService } from "../services/note.service.js"
import { showErrorMsg } from '../../../services/event-bus.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { AddNote } from "../cmps/AddNote.jsx"
import { NoteGrid } from "../cmps/NoteGrid.jsx"
// import './'
const { useEffect, useState } = React
const { useNavigate } = ReactRouter


export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(notesService.getDefaultFilter())
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [currNote, setCurrNote] = useState(null)
    const navigate = useNavigate()


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
                setIsEdit(false)
                navigate('/note')
            })
            .catch(() => {
                showErrorMsg(`couldn't remove note`)
            })
    }
    const startEditing = (note) => {
        setCurrNote(note);
        setIsEdit(true);
        setIsAdd(false);
    };

    const stopEditing = () => {
        setCurrNote(null);
        setIsEdit(false);
    };

    return (
        <section className="note-index main-layout">
            <NoteHeader filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

            {isAdd ? (
                <NoteEdit className="note-edit addnote" note={notesService.getEmptyNote()} setIsAdd={setIsAdd} setIsEdit={setIsEdit} />
            ) : (

                <AddNote setIsAdd={setIsAdd} />
            )}
            <NoteGrid className={`my-masonry-grid ${isEdit ? 'modal' : ''}`}
                notes={notes} removeNote={removeNote} setIsAdd={setIsAdd} startEditing={startEditing} />

            {isEdit && (
                <NoteEdit note={currNote} removeNote={removeNote} setIsEdit={setIsEdit} setIsAdd={setIsAdd} className="note-edit-preview" style={currNote.style} />


            )
                // : (
                //     <NoteGrid notes={notes} removeNote={removeNote} setIsAdd={setIsAdd} startEditing={startEditing} />
                // )
            }
        </section>
    )
}
