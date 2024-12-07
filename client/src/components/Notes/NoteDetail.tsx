import React, { useRef } from 'react';

const NoteDetail: React.FC<{ selectedNote: any, onSaveNote: (note: any) => void, onDeleteNote: () => void, onClose: () => void }> = ({ selectedNote, onSaveNote, onDeleteNote, onClose }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSaveNote = () => {
    if (!selectedNote) return;

    const updatedNote = {
      id: selectedNote._id,
      title: titleRef.current?.innerText || selectedNote.title,
      content: contentRef.current?.innerHTML || selectedNote.content
    };

    onSaveNote(updatedNote);
  };

  return (
    <div className="note-detail">
      <div className="note-header">
        <div
          ref={titleRef}
          contentEditable
          suppressContentEditableWarning
          className="note-title"
          onInput={handleSaveNote}
          dangerouslySetInnerHTML={{ __html: selectedNote.title }}
        />
        <div className="note-options">
          <button className="option-btn" onClick={onClose}>✕</button>
          <button className="option-btn del-btn" onClick={onDeleteNote}>🗑️</button>
        </div>
      </div>
      <div className="note-content">
        <div
          ref={contentRef}
          contentEditable
          suppressContentEditableWarning
          className="note-body"
          dangerouslySetInnerHTML={{ __html: selectedNote.content }}
          onInput={handleSaveNote}
        />
      </div>
    </div>
  );
};

export default NoteDetail;