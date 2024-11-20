import React, { useEffect, useState, useRef } from 'react';
import { debounce } from 'lodash'
import { createNote, getNotes, modifyNote, deleteNote } from '../api';
import showPopup from './popup';
import './NotesList.css'; // Import the CSS file

const NotesList: React.FC<{ username: string }> = ({ username }) => {
  const [notesList, setNotesList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedNote, setSelectedNote] = useState<any | null>(null);

  useEffect(() => {
    const getNoteList = async () => {
      try {
        const notes = await getNotes(username);
        setNotesList(notes);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    getNoteList();
  }, [username, notesList]);

  const handleCreateNote = async () => {
    await createNote({ username: username, title: "Untitled Note", content: "Write something..." });
    await getNotes(username);
  }

  // Refs to preserve cursor position
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Debounced save function to prevent excessive API calls
  const debouncedSave = useRef(
    debounce(async (note) => {
      try {
        await modifyNote(note);
        return true;
      } catch (error) {
        console.error('Save failed', error);
        return false;
      }
    }, 300)
  ).current;

  const handleSaveNote = () => {
    if (!selectedNote) return;

    const updatedNote = {
      id: selectedNote._id,
      title: titleRef.current?.innerText || selectedNote.title,
      content: contentRef.current?.innerHTML || selectedNote.content
    };

    // Only save if content actually changed
    if (
      updatedNote.title !== selectedNote.title ||
      updatedNote.content !== selectedNote.content
    ) {
      const savePromise = debouncedSave(updatedNote);

      if (savePromise instanceof Promise) {
        savePromise
          .then(success => showPopup(success ? 'Saved' : 'Save Failed', success))
          .catch(() => showPopup('Save Failed', false));
      }
    }
  };
  const handleDeleteNote = async () => {
    try {
      await deleteNote(selectedNote._id);
      setSelectedNote(null);
    } catch (error) {
      setError(error as Error);
    }
  };

  function htmlToText(html: string) {
    // Create a temporary DOM element
    const tempDiv = document.createElement('div');
    // Set the innerHTML to the HTML string
    tempDiv.innerHTML = html;
    // Get the text content
    let text = tempDiv.innerText || tempDiv.textContent || '';
    text = text.replace(/[^a-zA-Z0-9\s.,!?'-]/g, ''); // Keeps letters, numbers, and basic punctuation

    return text.trim();
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <div className="notes-container">
      {/* Sidebar with notes list */}
      <div className="sidebar">
        <div className="sidebar-header">
          <button className="new-note-btn" onClick={handleCreateNote}>
            + New
          </button>
        </div>

        {notesList.length === 0 ? (
          <div className="empty-state">No notes yet</div>
        ) : (
          <div className="notes-list-container">
            <ul className="notes-list">
              {notesList.map(note =>
              (
                <li
                  key={note._id}
                  className={`note-item ${selectedNote?._id === note._id ? 'selected' : ''}`}
                  onClick={() => setSelectedNote(note)}
                >
                  <h3>{note.title}</h3>
                  <p>{(note.content.length > 50)
                    ? htmlToText(note.content.slice(0, 50)) + '...'
                    : htmlToText(note.content)
                  }</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Note Detail View */}
      {selectedNote ? (
        <div className="note-detail">
          <div className="note-header">
            <div
              ref={titleRef}
              contentEditable
              suppressContentEditableWarning
              className="note-title"
              role="heading"
              aria-level={2}
              onKeyDown={(e) => {
                // Prevent new lines in the title
                if (e.key === 'Enter') {
                  e.preventDefault();
                  // Move focus to the content area
                  const contentArea = document.querySelector('[role="textbox"]') as HTMLElement;
                  if (contentArea) {
                    contentArea.focus();
                  }
                }
              }}
              onPaste={(e) => {
                // Prevent multi-line paste
                e.preventDefault();
                const pastedText = e.clipboardData.getData('text/plain');
                document.execCommand('insertText', false, pastedText.replace(/\n/g, ' '));
              }}
              onInput={handleSaveNote}
              dangerouslySetInnerHTML={{ __html: selectedNote.title }}
            >
            </div>
            <div className="note-options">
              <button className="option-btn" onClick={() => setSelectedNote(null)}>✕</button>
              <button className="option-btn" onClick={handleDeleteNote}>🗑️</button>
            </div>
          </div>
          <div className="note-content">
            <div
              ref={contentRef}
              contentEditable
              suppressContentEditableWarning
              role="textbox"
              className="note-body"
              dangerouslySetInnerHTML={{ __html: selectedNote.content }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  document.execCommand('insertParagraph');
                } else if (e.key === 'Tab') {
                  e.preventDefault();
                  document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
                }
              }}
              onInput={handleSaveNote}
            />
          </div>
        </div>
      ) : (
        <div className="note-detail-placeholder" style={{ position: 'relative', top: '50%', left: '50%', transform: 'translateX(-100%)' }}>
          {notesList.length === 0 ? (<h3>Create a new note</h3>) : (<h3>Click on a note to view and edit it</h3>)}
        </div>
      )
      }
    </div>
  );
};

export default NotesList;