import React from "react";
import NotesList from "./components/NotesList";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="py-8 text-center bg-white shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Notes Application
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Organize your thoughts, anywhere, anytime.
        </p>
      </header>
      <main className="container mx-auto px-4 py-6">
        <NotesList />
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Notes App</p>
      </footer>
    </div>
  );
};

export default App;
