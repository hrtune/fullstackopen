require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors')

const Note = require('./models/note')

app.use(express.static('build'))

app.use(cors())

app.use(express.json())

// https://fullstackopen.com/en/part3/node_js_and_express#middleware
const requestLogger = (request, response, next) => {
    console.log("Method:", request.method);
    console.log("Path:  ", request.path);
    console.log("Body:  ", request.body);
    console.log("---");
    next();
}
app.use(requestLogger)

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    
    return maxId + 1
}


// http://localhost:3001/
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

// http://localhost:3001/api/notes
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
    
})

// curl -X DELETE http://localhost:3001/api/notes/<id>
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(n => n.id !== id)
    response.status(204).json() // 204: no content
})

app.put('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const body = request.body
    if (!(body.content && body.id && body.date)) {
        return response.status(400).json({
            error: "not sufficient properties with values"
        })
    }

    const oldNote = notes.find(n => n.id === id)

    if (!(oldNote)) {
        return response.status(400).json({
            error: "no such id in notes"
        })
    }

    notes = notes.filter(n => n.id !== id)

    const newNote = body

    notes = notes.concat(newNote)

    response.status(200).json(newNote)
    
})

app.post('/api/notes', (request, response) => {
    const body = request.body
    if (!body.content) {
        return response.status(400).json({
            error: "content missing"
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })

})


const unknownEndPoint = (request, response) => {
    response.status(404).json({ error: 'unknown endpoint'})
}
app.use(unknownEndPoint)

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
