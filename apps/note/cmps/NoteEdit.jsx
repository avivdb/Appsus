
import { notesService } from "../services/note.service.js"
import { showErrorMsg } from '../../../services/event-bus.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'

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
        console.log(target);
        const field = target.name;
        let value = target.value;

        // switch (target.type) {
        //     case "number":
        //     case "range":
        //         value = +value;
        //         break;
        //     case "checkbox":
        //         value = target.checked;
        //         break;
        // }

        setBookToEdit((prevBook) => {
            if (field === "info") {
                return {
                    ...prevBook,
                    listPrice: { ...prevBook.listPrice, amount: value },
                }
            } else {

                return ({ ...prevBook, [field]: value })
            }
        })
    }

    // function handleChangeListPrice({ target }) {
    //     const { type, name: prop } = target
    //     let { value } = target

    //     switch (type) {
    //         case 'range':
    //         case 'number':
    //             value = +value
    //             break;

    //         case 'checkbox':
    //             value = target.checked
    //             break;
    //     }

    //     setNote(prevNote => ({
    //         ...prevNote,
    //         listPrice: { ...prevNote.listPrice, [prop]: value }
    //     }))
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
    } = note

    return (
        <section className='note-edit'>
            <h2>Edit Note</h2>

            <form onSubmit={onSave}>
                <label htmlFor="note-title"></label>
                <input onChange={handleChange} value={note.info.title}
                    id='note-title' type="text" name='note-title' />

                <label htmlFor="note-txt"></label>
                <input onChange={handleChange} value={note.info.txt}
                    id='note-txt' type="text" name='note-txt' />

                <button>Save</button>
            </form>
        </section>
    )
}