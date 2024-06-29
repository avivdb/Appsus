import { Logo } from "./Logo.jsx";
import { NoteFilter } from "./NoteFilter.jsx";

export function NoteHeader({ filterby, onSetFilterBy }) {
    return (
        <header className="note-header full">
            <Logo />
            <NoteFilter filterby={filterby} onSetFilterBy={onSetFilterBy} />
        </header>
    )
}