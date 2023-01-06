import { useState, useEffect } from "react";
import Note from "./components/Note";
import "./index.css"
import services from './services/notes'
import loginService from './services/login'

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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const hook = () => {
    console.log('Effect!');
    services.getAll().then(response =>{
      setNotes(response.data);
    })
  }

  useEffect(hook, [])
   useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      services.setToken(user.token)
    }
  }, [])

  console.log("render", notes.length, "notes");

  const addNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() > 0.5,
    };

    const data = await services.create(noteObject)
    console.log(data);
    setNotes(notes.concat(data)) // response will be attatched with id created by json-server
    setNewNote('')

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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password);
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)) 
      services.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
       
      {  // React trick
        user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      }
      
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
      <Footer />
    </div>
  );
};

export default App;
