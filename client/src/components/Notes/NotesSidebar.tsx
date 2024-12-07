// NotesSidebar.tsx
import React from 'react';
import NoteItem from './NoteItem';

const NotesSidebar: React.FC<{ notesList: any[], onSelectNote: (note: any) => void, onCreateNote: () => void, onDeleteNote: () => void, selectedNoteId: string | null }> = ({ notesList, onSelectNote, onCreateNote, onDeleteNote, selectedNoteId }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="new-note-btn" onClick={onCreateNote}>
          + New
        </button>
      </div>

      {notesList.length === 0 ? (
        <div className="empty-state">No notes yet</div>
      ) : (
        <div className="notes-list-container">
          <ul className="notes-list">
            {notesList.map(note => (
              <NoteItem
                key={note._id}
                note={note}
                onSelectNote={onSelectNote}
                isSelected={selectedNoteId === note._id}
                onDeleteNote={onDeleteNote}
          />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotesSidebar;