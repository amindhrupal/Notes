import React, { useEffect, useState } from "react";
import { fetchNotes, deleteNote, updateNote } from "../api/noteApi";
import Note from "./Note";
import NoteForm from "./NoteForm";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      console.log("useEffect triggered with searchQuery:", searchQuery);
      const data = await fetchNotes(searchQuery);
      console.log("Fetched notes:", data);

      if (searchQuery) {
        const filteredNotes = data.filter(
          (note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setNotes(filteredNotes);
      } else {
        setNotes(data);
      }
    };
    getNotes();
  }, [searchQuery]);

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter((note) => note._id !== id));
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleSaveEdit = async (updatedNote) => {
    if (!updatedNote) return;

    const result = await updateNote(updatedNote);
    if (result) {
      setNotes(notes.map((n) => (n._id === result._id ? result : n)));
      setEditingNote(null);
      return result;
    }
  };

  return (
    <div className="mt-6">
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg w-full md:w-4/5 px-6 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
        />
      </div>

      <NoteForm
        setNotes={setNotes}
        existingNote={editingNote}
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
