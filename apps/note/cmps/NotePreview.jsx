import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from "./NoteImg.jsx";
import { NoteVideo } from "./NoteVideo.jsx";
import { NoteNav } from "./NoteNav.jsx";
import { NoteTitle } from "./NoteTitle.jsx";


export function NotePreview({ note, removeNote }) {



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