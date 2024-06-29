
import { notesService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { NoteNav } from "./NoteNav.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVideo } from './NoteVideo.jsx'


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

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        // console.log('setIsEdit', setIsEdit)
        if (currNote) return
        if (params.noteId) {
            notesService.get(params.noteId).then(setCurrNote)
        }
    }, [currNote, params.noteId])

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
        // console.log('target.value,prop', target, value, prop)
        setCurrNote(prevNote => ({ ...prevNote, [prop]: value }))
    }



    function handleChangeInfo({ target }) {
        const { type, name: prop } = target
        let { value } = target
        function addPic() {
            setPicUrl
        }
        setCurrNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, [prop]: value }
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
    // function handleCloseBtn() {
    //     setIsEdit(false)
    // }
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

                {currNote.info.imgUrls && currNote.info.imgUrls.map((url, index) => (
                    <div key={index}>
                        <NoteImg note={{ info: { imgUrl: url } }} />
                        <button onClick={() => handleDeleteImg(index)}>x</button>
                    </div>
                ))}

                {showImgUrlInput && (
                    <div>
                        <label htmlFor="newImgUrl"></label>
                        <input
                            type="text"
                            placeholder="Enter image URL"
                            value={newImgUrl}
                            onChange={(e) => setNewImgUrl(e.target.value)}
                        />
                        <button onClick={handleAddPic}>+</button>
                    </div>
                )}

                {currNote.info.videoUrls && currNote.info.videoUrls.map((url, index) => (
                    <div key={index}>
                        <NoteVideo note={{ info: { videoUrl: url } }} />
                        <button onClick={() => handleDeleteVideo(index)}>x</button>
                    </div>
                ))}

                {showVideoUrlInput && (
                    <div>
                        <label htmlFor="newVideoUrl"></label>
                        <input
                            type="text"
                            placeholder="Enter video URL"
                            value={newVideoUrl}
                            onChange={(e) => setNewVideoUrl(e.target.value)}
                        />
                        <button onClick={handleAddVideo}>+</button>
                    </div>
                )}

                {todo.map((task, index) => (
                    <div key={index}>
                        <span>{task}</span>
                        <button onClick={() => handleDeleteTodo(index)}>x</button>
                    </div>
                ))}

                {showTodoInput && (
                    <div>
                        <label htmlFor="newTodo"></label>
                        <input
                            type="text"
                            placeholder="Enter todo"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                        />
                        <button onClick={handleAddTodo}>+</button>
                    </div>
                )}


            </form>

            {<NoteNav
                note={currNote}
                // onRemove={() => notesService.remove(currNote.id).then(() => navigate('/note'))}
                onRemove={removeNote}
                onSave={onSave}
                onAddPic={() => setShowImgUrlInput(true)}
                onAddVideo={() => setShowVideoUrlInput(true)}
                onAddTodo={() => setShowTodoInput(true)}
                onClose={() => {
                    console.log('setIsEdit', setIsEdit)
                    setIsEdit(false)
                }}
            />}

        </section>
    )
}