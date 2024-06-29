import { NotePreview } from "./NotePreview.jsx"

const { Link } = ReactRouterDOM


export function NoteList({ notes, removeNote, setIsAdd, setIsEdit }) {

    return (
        <ul className="note-list">
            {notes.map(note =>
                <li className="note" key={note.id} >
                    <NotePreview note={note} removeNote={removeNote} setIsEdit={setIsEdit} setIsAdd={setIsAdd} />
                </li>
            )}
        </ul>

    )
}
