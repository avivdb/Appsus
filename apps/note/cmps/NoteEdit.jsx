
import { notesService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { NoteNav } from "./NoteNav.jsx"


const { useParams, useNavigate } = ReactRouter

const { useState, useEffect } = React

export function NoteEdit({ note, setIsAdd, setIsEdit }) {

    const [currNote, setCurrNote] = useState(note || notesService.getEmptyNote())
    const [newImgUrl, setNewImgUrl] = useState('');
    const [showImgUrlInput, setShowImgUrlInput] = useState(false);
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

                {showImgUrlInput && (
                    <div>
                        <label htmlFor="newImgUrl">Image URL</label>
                        <input
                            type="text"
                            placeholder="Enter image URL"
                            value={newImgUrl}
                            onChange={(e) => setNewImgUrl(e.target.value)}
                        />
                        <button type="button" onClick={handleAddPic}>Add Pic</button>
                    </div>
                )}

            </form>

            {<NoteNav
                note={currNote}
                onRemove={() => notesService.remove(currNote.id).then(() => navigate('/note'))}
                onSave={onSave}
                onAddPic={() => setShowImgUrlInput(true)}
            />}

        </section>
    )
}