import { NoteEdit } from "./NoteEdit.jsx"

export function AddNote({ setIsAdd }) {

    return (
        <section className="add-note" onClick={() => setIsAdd(true)}>
            <form>
                <label htmlFor="add-note-txt"></label>
                <input type="text" placeholder="Take a note..." name="add-note-txt" id="add-note-txt" />
            </form>

        </section>
    )
} 
