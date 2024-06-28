
const { Link } = ReactRouterDOM


export function NoteNav({ note, onRemove, onSave, onAddPic, onAddVideo, onAddTodo }) {


    return (
        <nav className='note-nav'>

            <button onClick={() => onRemove(note.id)} >remove</button>
            <button onClick={onSave}>Save</button>
            <button onClick={onAddPic}>add pic</button>
            <button onClick={onAddVideo}>Add Video</button>
            <button onClick={onAddTodo}>Add Todo</button>

        </nav>

    )
}