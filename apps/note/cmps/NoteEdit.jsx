
import { notesService } from "../services/note.service.js"
import { showErrorMsg } from '../../../services/event-bus.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { NoteNav } from "./NoteNav.jsx"

const { useParams, useNavigate } = ReactRouter

const { useState, useEffect } = React

export function NoteEdit() {

    const [note, setNote] = useState(notesService.getEmptyNote())
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!params.noteId) return
        notesService.get(params.noteId).then(setNote)
    }, [])

    function onSave(ev) {
        ev.preventDefault()
        notesService.save(note)
            .then(() => showSuccessMsg('Note has successfully saved!'))
            .catch(() => showErrorMsg(`couldn't save note`))
            .finally(() => navigate('/note'))
    }

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target
        // console.log('target.value,prop', target, value, prop)
        setNote(prevNote => ({ ...prevNote, [prop]: value }))
    }



    function handleChangeInfo({ target }) {
        const { type, name: prop } = target
        let { value } = target

        setNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, [prop]: value }
        }))
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
    } = note

    return (
        <section className='note-edit'>

            <form onSubmit={onSave}>

                <label htmlFor="title"></label>
                <input
                    onChange={handleChangeInfo}
                    value={note.info.title}
                    placeholder="Title"
                    id='title'
                    type="text"
                    name='title' />

                <label htmlFor="txt"></label>
                <input
                    onChange={handleChangeInfo}
                    value={note.info.txt}
                    placeholder="Take a note..."
                    id='txt'
                    type="text"
                    name='txt' />

                <button>Save</button>

            </form>
            {<NoteNav note={note} />}

        </section>
    )
}