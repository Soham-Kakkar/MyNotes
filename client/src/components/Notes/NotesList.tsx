import React, { useEffect, useState } from 'react';
import NotesSidebar from './NotesSidebar';
import NoteDetail from './NoteDetail';
import showPopup from '../Toast/popup';
import { NotesAPI } from '../../api/NotesAPI';
import './NotesList.css';

const NotesPage: React.FC<{ username: string }> = ({ username }) => {
  const [notesList, setNotesList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedNote, setSelectedNote] = useState<any | null>(null);

  const getNoteList = async () => {
    try {
      const notes = await NotesAPI.getNotes(username);
      setNotesList(notes);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNoteList();
  }, [username]);

  const handleCreateNote = async () => {
    await NotesAPI.createNote({ username, title: "Untitled Note", content: "" });
    await getNoteList();
  };

  const handleSaveNote = async (updatedNote: any) => {
    try {
      await NotesAPI.modifyNote(updatedNote);
      showPopup('Saved', 'green');
      await getNoteList();
    } catch {
      showPopup('Save Failed', 'red');
    }
  };

  const handleDeleteNote = async () => {
    if (!selectedNote) return;
    try {
      await NotesAPI.deleteNote(selectedNote._id);
      await getNoteList();
      setSelectedNote(null);
    } catch (error) {
      setError(error as Error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="notes-container">
      <NotesSidebar
        notesList={notesList}
        onSelectNote={setSelectedNote}
        onCreateNote={handleCreateNote}
        onDeleteNote={handleDeleteNote}
        selectedNoteId={selectedNote?._id || null}
      />
      {selectedNote && (
        <NoteDetail
          selectedNote={selectedNote}
          onSaveNote={handleSaveNote}
          onDeleteNote={handleDeleteNote}
          onClose={() => setSelectedNote(null)}
        />
      )}
    </div>
  );
};

export default NotesPage;