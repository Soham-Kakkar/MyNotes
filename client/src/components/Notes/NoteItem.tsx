import React from 'react';

const NoteItem: React.FC<{ note: any, onSelectNote: (note: any) => void, isSelected: boolean, onDeleteNote: () => void }> = ({ note, onSelectNote, isSelected, onDeleteNote }) => {
  const cleanContent = note.content.replace(/&nbsp;/g, ' ').replace(/<[^>]*>|&[^;]*;/g, '');
  return (
    <li className="note-item">
      <div
        className={`note-list-item ${isSelected ? 'selected' : ''}`}
        onClick={() => onSelectNote(note)}
      >
        <div className="note-item-title">
          <h3>{note.title}</h3>
          <button className="option-btn del-btn" onClick={onDeleteNote}>🗑️</button>
        </div>
        <p>{cleanContent.length > 50 ? cleanContent.slice(0, 50) + '...' : cleanContent}</p>
      </div>
    </li>
  );
};

export default NoteItem;