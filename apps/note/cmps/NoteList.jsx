import { NotePreview } from "./NotePreview.jsx"

const { Link } = ReactRouterDOM


export function NoteList({ notes, onRemove }) {

    return (
        <section className="note-list">
            <ul>
                {notes.map(note =>
                    <li key={note.id} >
                        <NotePreview note={note} />
                        <button onClick={() => onRemove(note.id)} >remove</button>
                        <nav className='note-nav'>
                            <Link to={`/note/${note.id}`}><button>Details</button></Link>
                            <Link to={`/note/edit/${note.id}`}><button>edit</button></Link>
                        </nav>
                    </li>
                )}
            </ul>
        </section>
    )
}
