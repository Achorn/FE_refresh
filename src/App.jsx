import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const API_URL = "http://localhost:3000/notes";

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("success", data);
      setNotes(data.data);
    } catch (error) {
      console.error("error fetching notes:", error);
    }

    const handleAddNote = async (e) => {
      e.preventDefault();
      if (!title || !content) return;

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
          setTitle("");
          setContent("");
          fetchNotes(); // Refresh list after adding
        }
      } catch (error) {
        console.error("Error adding note:", error);
      }
    };
  };
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        setTitle("");
        setContent("");
        fetchNotes(); // Refresh list after adding
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchNotes(); // Refresh list after deleting
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial",
      }}
    >
      <h1>Simple Notes App</h1>

      {/* Note Creation Form */}
      <form onSubmit={handleAddNote} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Note Content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            height: "80px",
            marginBottom: "10px",
          }}
        />
        <button
          type="submit"
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Add Note
        </button>
      </form>

      {/* Notes Grid/List Display */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "5px",
                position: "relative",
              }}
            >
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button
                onClick={() => handleDeleteNote(note.id)}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  background: "#ff4d4d",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
