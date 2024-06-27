
const { Link } = ReactRouterDOM

export function NoteNav({ note, onRemove, onSave }) {


    return (
        <nav className='note-nav'>
            <button onClick={() => onRemove(note.id)} >remove</button>
            <button onClick={onSave}>Save</button>
            <button>add pic</button>
            {/* <Link to={`/note/edit/${note.id}`}><button>edit</button></Link> */}
            {/* <button onClick={() => setIsEdit(true)}>Edit</button> */}
        </nav>

    )
}