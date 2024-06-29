import React from '../../../lib/react.js';
import Masonry from '../../../lib/react-masonry-css.js';
import { NotePreview } from './NotePreview.jsx'; // Adjust the import according to your file structure

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

export function NoteGrid({ notes, removeNote, setIsAdd, setIsEdit, startEditing, className }) {
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className={className}
            columnClassName="my-masonry-grid_column"
        >
            {notes.map(note => (
                <NotePreview
                    key={note.id}
                    note={note}
                    removeNote={removeNote}
                    setIsAdd={setIsAdd}
                    setIsEdit={setIsEdit}
                    startEditing={startEditing}
                />
            ))}
        </Masonry>
    );
}
