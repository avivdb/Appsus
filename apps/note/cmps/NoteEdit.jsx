
import { notesService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { NoteNav } from "./NoteNav.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVideo } from './NoteVideo.jsx'


const { useParams, useNavigate } = ReactRouter

const { useState, useEffect } = React

export function NoteEdit({ note, setIsAdd, setIsEdit }) {

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
        <section className='note-edit'>
            <form onSubmit={onSave}>

                <label htmlFor="title"></label>
                <input
                    onChange={handleChangeInfo}
                    value={currNote.info.title}
                    placeholder="Title"
                    id='title'
                    type="text"
                    name='title' />

                <label htmlFor="txt"></label>
                <input
                    onChange={handleChangeInfo}
                    value={currNote.info.txt}
                    placeholder="Take a note..."
                    id='txt'
                    type="text"
                    name='txt' />

                {currNote.info.imgUrls && currNote.info.imgUrls.map((url, index) => (
                    <div key={index}>
                        <NoteImg note={{ info: { imgUrl: url } }} />
                        <button onClick={() => handleDeleteImg(index)}>Delete</button>
                    </div>
                ))}

                {showImgUrlInput && (
                    <div>
                        <label htmlFor="newImgUrl">Image URL</label>
                        <input
                            type="text"
                            placeholder="Enter image URL"
                            value={newImgUrl}
                            onChange={(e) => setNewImgUrl(e.target.value)}
                        />
                        <button onClick={handleAddPic}>Add Pic</button>
                    </div>
                )}

                {currNote.info.videoUrls && currNote.info.videoUrls.map((url, index) => (
                    <div key={index}>
                        <NoteVideo note={{ info: { videoUrl: url } }} />
                        <button onClick={() => handleDeleteVideo(index)}>Delete</button>
                    </div>
                ))}

                {showVideoUrlInput && (
                    <div>
                        <label htmlFor="newVideoUrl">Video URL</label>
                        <input
                            type="text"
                            placeholder="Enter video URL"
                            value={newVideoUrl}
                            onChange={(e) => setNewVideoUrl(e.target.value)}
                        />
                        <button onClick={handleAddVideo}>Add Video</button>
                    </div>
                )}

                {todo.map((task, index) => (
                    <div key={index}>
                        <span>{task}</span>
                        <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                    </div>
                ))}

                {showTodoInput && (
                    <div>
                        <label htmlFor="newTodo">New Todo</label>
                        <input
                            type="text"
                            placeholder="Enter todo"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                        />
                        <button onClick={handleAddTodo}>Add Todo</button>
                    </div>
                )}



            </form>

            {<NoteNav
                note={currNote}
                onRemove={() => notesService.remove(currNote.id).then(() => navigate('/note'))}
                onSave={onSave}
                onAddPic={() => setShowImgUrlInput(true)}
                onAddVideo={() => setShowVideoUrlInput(true)}
                onAddTodo={() => setShowTodoInput(true)}
            />}

        </section>
    )
}