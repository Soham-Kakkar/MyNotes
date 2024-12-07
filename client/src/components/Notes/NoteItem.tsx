import React from 'react';

const NoteItem: React.FC<{ note: any, onSelectNote: (note: any) => void, isSelected: boolean }> = ({ note, onSelectNote, isSelected }) => {
  return (
    <li
      className={`note-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelectNote(note)}
    >
      <h3>{note.title}</h3>
      <p>{note.content.length > 50 ? note.content.slice(0, 50) + '...' : note.content}</p>
    </li>
  );
};

export default NoteItem;