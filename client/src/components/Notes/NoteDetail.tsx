import React, { useRef, useState, useEffect } from 'react';

interface NoteDetailProps {
  selectedNote: any | null;
  onSaveNote: (note: { id: string, title: string, content: string }) => void;
  onDeleteNote: () => void;
  onClose: () => void;
}

const NoteDetail: React.FC<NoteDetailProps> = ({ selectedNote, onSaveNote, onDeleteNote, onClose }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const debounceTime = 500; // half a second
  
  const handleSaveNote = () => {
    if (!selectedNote) return;

    const updatedNote = {
      id: selectedNote._id,
      title: titleRef.current?.innerText || selectedNote.title,
      content: contentRef.current?.innerHTML || selectedNote.content,
    };

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      onSaveNote(updatedNote);
    }, debounceTime);

    setDebounceTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

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
