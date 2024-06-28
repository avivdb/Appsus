import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from "./NoteImg.jsx";
import { NoteVideo } from "./NoteVideo.jsx";
import { NoteNav } from "./NoteNav.jsx";
import { NoteTitle } from "./NoteTitle.jsx";
import { NoteEdit } from "./NoteEdit.jsx";
import { NoteToDo } from "./NoteToDo.jsx";
const { useState } = React

export function NotePreview({ note, setIsAdd }) {

    const [isEdit, setIsEdit] = useState(false);

    return (
        <section onClick={() => {
            setIsEdit(true)
            setIsAdd(false)
        }} className="note-preview" style={note.style}>
            {isEdit ? (
                <NoteEdit note={note} setIsEdit={setIsEdit} setIsAdd={setIsAdd} />
            ) : (
                <section className="note-preview" style={note.style}>

                    {note.info.title && <NoteTitle note={note} />}

                    {note.info.txt && <NoteTxt note={note} />}

                    {note.info.imgUrls && note.info.imgUrls.map((url, index) => (
                        <NoteImg key={index} note={{ info: { imgUrl: url } }} />
                    ))}

                    {note.info.videoUrls && note.info.videoUrls.map((url, index) => (
                        <NoteVideo key={index} note={{ info: { videoUrl: url } }} />
                    ))}

                    {note.info.todo && <NoteToDo note={note} />}
                </section>
            )}
        </section>
    )
}