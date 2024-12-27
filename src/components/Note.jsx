const Note = ({ note, onDelete, onEdit }) => {
  const { _id, title, content, image } = note;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
      {image && (
        <img
          src={`http://localhost:5000/${image}`}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h2 className="text-gray-800 text-xl font-semibold mb-3">{title}</h2>
      <p className="text-gray-600 text-sm line-clamp-3">{content}</p>
      <div className="mt-4 flex justify-between gap-4">
        <button
          onClick={() => onDelete(_id)}
          className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
        <button
          onClick={() => onEdit(note)}
          className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-400 hover:text-black"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Note;
