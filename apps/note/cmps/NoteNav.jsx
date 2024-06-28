
const { Link } = ReactRouterDOM


export function NoteNav({ note, onRemove, onSave, onAddPic, onAddVideo }) {


    return (
        <nav className='note-nav'>
            <button onClick={() => onRemove(note.id)} >remove</button>
            <button onClick={onSave}>Save</button>
            <button onClick={onAddPic}>add pic</button>
            <button onClick={onAddVideo}>Add Video</button>

            {/* <Link to={`/note/edit/${note.id}`}><button>edit</button></Link> */}
            {/* <button onClick={() => setIsEdit(true)}>Edit</button> */}
        </nav>

    )
}