import { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    console.log('Effect!');
    axios
      .get("http://localhost:3001/notes")
      .then(response =>{
        console.log("Promise fullfiled!");
        setNotes(response.data);
      })
  }

  useEffect(hook, [])

  console.log("render", notes.length, "notes");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() > 0.5,
    };

    axios
      .post("http://localhost:3001/notes", noteObject)
      .then(response => {
        setNotes(notes.concat(response.data)) // response will be attatched with id created by json-server
        setNewNote('')
      })

  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = (
    showAll
    ? notes
    : notes.filter(note => note.important)
  )

  const toggleImportanceOf = (note) => {
    const url = `http://localhost:3001/notes/${note.id}`
    const changedNote = {...note, important: !note.important}
    axios
      .put(url, changedNote)
      .then(response => {
        setNotes(notes.map(n => n.id !== note.id ? n : response.data))
      })
      .catch(error => {
        alert(`the note '${note.content}' has already deleted from server`)
        setNotes(notes.filter(n => n.id !== note.id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note)}/>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
