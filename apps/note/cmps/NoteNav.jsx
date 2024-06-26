
const { Link } = ReactRouterDOM

export function NoteNav({ note, onRemove }) {


    return (
        <nav className='note-nav'>
            <button onClick={() => onRemove(note.id)} >remove</button>
            {/* <Link to={`/note/${note.id}`}><button>Details</button></Link> */}
            <Link to={`/note/edit/${note.id}`}><button>edit</button></Link>

        </nav>
    )
}