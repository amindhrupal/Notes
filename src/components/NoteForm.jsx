import React, { useState, useEffect } from "react";
import { addNote, updateNote } from "../api/noteApi";

const NoteForm = ({ setNotes, existingNote, onSaveEdit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setImage(existingNote.image || null);
    } else {
      setTitle("");
      setContent("");
      setImage(null);
    }
  }, [existingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) return;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    if (existingNote) {
      const updatedNote = await onSaveEdit({
        ...existingNote,
        title,
        content,
        image,
      });

      if (updatedNote) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === updatedNote._id ? updatedNote : note
          )
        );
      }
    } else {
      const newNote = await addNote(formData);
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    }

    setTitle("");
    setContent("");
    setImage(null);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg mb-6 w-full md:w-4/5 mx-auto"
    >
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg w-full px-6 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 rounded-lg w-full px-6 py-4 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4 file:border file:border-gray-300 file:px-4 file:py-2 file:rounded-lg"
        />
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="bg-purple-900 text-white px-6 py-3 rounded-full hover:bg-purple-700 w-full md:w-auto"
        >
          {existingNote ? "Save Changes" : "Add Note"}
        </button>
      </div>
    </form>
  );
};
export default NoteForm;
