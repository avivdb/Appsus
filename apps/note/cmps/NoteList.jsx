import { NotePreview } from "./NotePreview.jsx"

const { Link } = ReactRouterDOM


export function NoteList({ notes }) {

    return (
        <section className="note-list">
            <ul>
                {notes.map(note =>
                    <li key={note.id} >
                        <NotePreview note={note} />
                    </li>
                )}
            </ul>
        </section>
    )
}
