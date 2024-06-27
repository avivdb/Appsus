import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from "./NoteImg.jsx";
import { NoteVideo } from "./NoteVideo.jsx";
import { NoteNav } from "./NoteNav.jsx";
import { NoteTitle } from "./NoteTitle.jsx";
import { NoteEdit } from "./NoteEdit.jsx";
const { useState } = React

export function NotePreview({ note }) {

    const [isEdit, setIsEdit] = useState(false);

    return (
        <section onClick={() => { setIsEdit(true) }} className="note-preview" style={note.style}>
            {isEdit ? (
                <NoteEdit note={note} setIsEdit={setIsEdit} />
            ) : (
                <section className="note-preview" style={note.style}>
                    {note.info.title && <NoteTitle note={note} />}
                    {note.info.txt && <NoteTxt note={note} />}
                    {note.info.imgUrl && <NoteImg note={note} />}
                    {note.info.videoUrl && <NoteVideo note={note} />}
                </section>
            )}
        </section>
    )
}