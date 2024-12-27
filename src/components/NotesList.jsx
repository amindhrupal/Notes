import React, { useEffect, useState } from "react";
import { fetchNotes, deleteNote, updateNote } from "../api/noteApi";
import Note from "./Note";
import NoteForm from "./NoteForm";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    const getNotes = async () => {
      const data = await fetchNotes();
      setNotes(data);
    };
    getNotes();
  }, []);

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter((note) => note._id !== id));
  };

  const handleEdit = (note) => {
    setEditingNote(note); // Set the note to edit
  };

  const handleSaveEdit = async (updatedNote) => {
    if (!updatedNote) return; // Prevent saving if note is not valid

    const result = await updateNote(updatedNote);
    if (result) {
      setNotes(notes.map((n) => (n._id === result._id ? result : n)));
      setEditingNote(null); // Close the edit mode after saving
      return result; // Ensure the updated note is returned
    }
  };

  return (
    <div className="mt-6">
      <NoteForm
        setNotes={setNotes}
        existingNote={editingNote} // Pass the existing note to the form
        onSaveEdit={handleSaveEdit}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {notes.map((note) => (
          <Note
            key={note._id}
            note={note}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesList;
