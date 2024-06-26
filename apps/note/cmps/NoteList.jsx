import { NotePreview } from "./NotePreview.jsx"

const { Link } = ReactRouterDOM


export function NoteList({ notes, removeNote }) {

    return (
        <section className="note-list">
            <ul>
                {notes.map(note =>
                    <li key={note.id} >
                        <NotePreview note={note} removeNote={removeNote} />
                    </li>
                )}
            </ul>
        </section>
    )
}
