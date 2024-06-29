
import { notesService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { NoteNav } from "./NoteNav.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVideo } from './NoteVideo.jsx'
import { NoteBackground } from "./NoteBackground.jsx"


const { useParams, useNavigate } = ReactRouter

const { useState, useEffect } = React

export function NoteEdit({ note, setIsAdd, removeNote, setIsEdit, className, handleClose, style }) {

    const [currNote, setCurrNote] = useState(note || notesService.getEmptyNote())
    const [newImgUrl, setNewImgUrl] = useState('')
    const [showImgUrlInput, setShowImgUrlInput] = useState(false)
    const [newVideoUrl, setNewVideoUrl] = useState('')
    const [showVideoUrlInput, setShowVideoUrlInput] = useState(false)
    const [newTodo, setNewTodo] = useState('')
    const [showTodoInput, setShowTodoInput] = useState(false)
    // const [newBackground, setNewBacground] = useState('')

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        if (currNote) return
        if (params.noteId) {
            notesService.get(params.noteId).then(setCurrNote)
        }
    }, [params.noteId])

    function onSave(ev) {
        ev.preventDefault()
        notesService.save(currNote)
            .then(() => {
                showSuccessMsg('Note has successfully saved!')
                setIsAdd(false)
                setIsEdit(false)
                navigate('/note')
            })
            .catch(() => showErrorMsg(`couldn't save note`))
            .finally(() => navigate('/note'))
    }

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target
        setCurrNote(prevNote => ({ ...prevNote, [prop]: value }))
    }



    function handleChangeInfo({ target }) {
        const { type, name: prop } = target
        let { value } = target
        setCurrNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, [prop]: value }
        }))
    }
    function handleChangeStyle({ target }) {
        const { type, name: prop } = target
        let { value } = target
        console.log('target', target)
        console.log('prop', prop)
        console.log('value', value)
        setCurrNote(prevNote => ({
            ...prevNote,
            style: { ...prevNote.style, [prop]: value }
        }))
    }

    function handleAddPic() {
        const updatedImgUrls = currNote.info.imgUrls ? [...currNote.info.imgUrls, newImgUrl] : [newImgUrl];
        setCurrNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, imgUrls: updatedImgUrls }
        }));
        setNewImgUrl('');  // Clear the input after adding
        setShowImgUrlInput(false);  // Hide the input after adding
    }

    function handleDeleteImg(index) {
        const updatedImgUrls = currNote.info.imgUrls.filter((_, i) => i !== index);
        setCurrNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, imgUrls: updatedImgUrls }
        }));
    }

    function handleAddVideo() {
        const updatedVideoUrls = currNote.info.videoUrls ? [...currNote.info.videoUrls, newVideoUrl] : [newVideoUrl];
        setCurrNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, videoUrls: updatedVideoUrls }
        }));
        setNewVideoUrl('');  // Clear the input after adding
        setShowVideoUrlInput(false);  // Hide the input after adding
    }

    function handleDeleteVideo(index) {
        const updatedVideoUrls = currNote.info.videoUrls.filter((_, i) => i !== index);
        setCurrNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, videoUrls: updatedVideoUrls }
        }));
    }

    function handleAddTodo() {
        const todosToAdd = newTodo.split(',').map(todo => todo.trim()).filter(todo => todo !== '');
        const updatedTodo = currNote.info.todo ? [...currNote.info.todo, ...todosToAdd] : todosToAdd;
        setCurrNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, todo: updatedTodo }
        }));
        setNewTodo('');  // Clear the input after adding
        setShowTodoInput(false);  // Hide the input after adding
    }

    function handleDeleteTodo(index) {
        const updatedTodo = currNote.info.todo.filter((_, i) => i !== index);
        setCurrNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, todo: updatedTodo }
        }));
    }


    const {
        id,
        createdAt,
        type,
        isPinned,
        info: {
            title,
            txt,
            imgUrl,
            videoUrl,
            todo, },
        style: {
            backgroundColor,
        }
    } = currNote

    return (
        <section className={className} style={currNote.style}>
            <form onSubmit={onSave}>

                <label htmlFor="title"></label>
                <input
                    onChange={handleChangeInfo}
                    value={currNote.info.title}
                    placeholder="Title"
                    id='title'
                    type="text"
                    name='title'
                    className="title" />

                <label htmlFor="txt"></label>
                <textarea
                    onChange={handleChangeInfo}
                    value={currNote.info.txt}
                    placeholder="Take a note..."
                    id='txt'
                    type="text"
                    name='txt'
                    className="txtarea" />


                {/* <label htmlFor="backgroundColor"></label>
                <input
                    onChange={handleChangeStyle}
                    value={currNote.style.backgroundColor}
                    // placeholder="Take a note..."
                    id='backgroundColor'
                    type="color"
                    name='backgroundColor'
                    className="bg-color" /> */}

                {/* <NoteBackground currNote={currNote} handleChangeStyle={handleChangeStyle} /> */}

                {currNote.info.imgUrls && currNote.info.imgUrls.map((url, index) => (
                    <div key={index}>
                        <NoteImg note={{ info: { imgUrl: url } }} />
                        <button onClick={() => handleDeleteImg(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                            </svg>

                        </button>
                    </div>
                ))}

                {showImgUrlInput && (
                    <div className="add-img">
                        <label htmlFor="newImgUrl"></label>
                        <input
                            type="text"
                            placeholder="Enter image URL"
                            value={newImgUrl}
                            onChange={(e) => setNewImgUrl(e.target.value)}
                        />
                        <button onClick={handleAddPic}>
                            <svg height="18px" width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="#000000">
                                <path d="m38 26h-12v12h-4v-12h-12v-4h12v-12h4v12h12v4z" />
                                <path d="m0 0h48v48h-48z" fill="none" />
                            </svg>

                        </button>
                    </div>
                )}

                {currNote.info.videoUrls && currNote.info.videoUrls.map((url, index) => (
                    <div key={index}>
                        <NoteVideo note={{ info: { videoUrl: url } }} />
                        <button onClick={() => handleDeleteVideo(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                            </svg>

                        </button>
                    </div>
                ))}

                {showVideoUrlInput && (
                    <div className="add-video">
                        <label htmlFor="newVideoUrl"></label>
                        <input
                            type="text"
                            placeholder="Enter video URL"
                            value={newVideoUrl}
                            onChange={(e) => setNewVideoUrl(e.target.value)}
                        />
                        <button onClick={handleAddVideo}>
                            <svg height="18px" width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="#000000">
                                <path d="m38 26h-12v12h-4v-12h-12v-4h12v-12h4v12h12v4z" />
                                <path d="m0 0h48v48h-48z" fill="none" />
                            </svg>

                        </button>
                    </div>
                )}

                {todo.map((task, index) => (
                    <div className="show-todo" key={index}>
                        {task}
                        <button onClick={() => handleDeleteTodo(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                            </svg>

                        </button>
                    </div>
                ))}

                {showTodoInput && (
                    <div className="add-todo">
                        <label htmlFor="newTodo"></label>
                        <input
                            type="text"
                            placeholder="Enter todo"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                        />
                        <button onClick={handleAddTodo}>
                            <svg height="18px" width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="#000000">
                                <path d="m38 26h-12v12h-4v-12h-12v-4h12v-12h4v12h12v4z" />
                                <path d="m0 0h48v48h-48z" fill="none" />
                            </svg>

                        </button>
                    </div>
                )}


            </form>

            {<NoteNav
                note={currNote}
                onRemove={removeNote}
                onSave={onSave}
                onAddPic={() => setShowImgUrlInput(true)}
                onAddVideo={() => setShowVideoUrlInput(true)}
                onAddTodo={() => setShowTodoInput(true)}
                handleChangeStyle={handleChangeStyle}
            />}

        </section>
    )
}