import { NoteColor } from "./NoteColor.jsx";


export function NoteNav({ note, onRemove, onSave, onAddPic, onAddVideo, onAddTodo, handleChangeStyle }) {


    return (
        <nav className='note-nav'>

            <button className="remove-btn" onClick={() => onRemove(note.id)} title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z" /><path d="M9 8h2v9H9zm4 0h2v9h-2z" />
                </svg>
            </button>

            {/* <button className="save-btn" onClick={onSave} title="Save">
                <svg width="17px" height="17px" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(-1.000000, 0)">
                        <polygon
                            fillRule="nonzero" points="6.20410932 
                        12.7874193 2.36690889 8.95021885 1.06483729
                        10.2522905 6.20410932 15.3915625 
                        17.2464127 4.34925911 15.9443411 3.0471875">

                        </polygon>
                    </g>
                </svg>
            </button> */}

            <button className="add-pic-btn" onClick={onAddPic} title="Add Image">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z" />
                </svg>
            </button>

            <button className="add-vid-btn" onClick={onAddVideo} title="Add video">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
                </svg>
            </button>

            <button className="add-todo-btn" onClick={onAddTodo} title="Add Todo" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                    <path d="M18 9l-1.4-1.4-6.6 6.6-2.6-2.6L6 13l4 4z" />
                </svg>
            </button>
            <NoteColor className="btn" currNote={note} handleChangeStyle={handleChangeStyle} />
            <button className="close-btn" onClick={onSave}>Close</button>

        </nav>

    )
}