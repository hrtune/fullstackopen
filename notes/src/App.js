import { useState, useEffect } from "react";
import Note from "./components/Note";
import "./index.css"
import services from './services/notes'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 12
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2022
      </em>
    </div>
  );
}

const Notification = ({message}) => {
  if (!message) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    console.log('Effect!');
    services.getAll().then(response =>{
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

    services.create(noteObject).then(response => {
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
    const changedNote = {...note, important: !note.important}
    services.update(note.id, changedNote)
      .then(response => {
        setNotes(notes.map(n => n.id !== note.id ? n : response.data))
      })
      .catch(error => {
        setErrorMessage(`The note '${note.content}' has already deleted from server`)
        setNotes(notes.filter(n => n.id !== note.id))
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
      <Footer />
    </div>
  );
};

export default App;
