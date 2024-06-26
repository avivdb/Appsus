import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from "./NoteImg.jsx";
import { NoteVideo } from "./NoteVideo.jsx";
import { NoteNav } from "./NoteNav.jsx";
import { NoteTitle } from "./NoteTitle.jsx";
export function NotePreview({ note }) {

    function removeNote(noteId) {
        notesService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => noteId !== note.id))
                showSuccessMsg('Note has been successfully removed!')
            })
            .catch(() => {
                showErrorMsg(`couldn't remove note`)
                navigate('/note')
            })
    }

    return (
        <section className="note-preview" style={note.style}>

            {note.info.title && <NoteTitle note={note} />}
            {note.info.txt && <NoteTxt note={note} />}
            {note.info.imgUrl && <NoteImg note={note} />}
            {note.info.videoUrl && <NoteVideo note={note} />}

            {<NoteNav note={note} onRemove={removeNote} />}

        </section>
    )
}