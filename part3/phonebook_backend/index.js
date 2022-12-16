const express = require("express")
const app = express()

app.use(express.json())

let notes = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
]

const generateId = () => Math.floor(Math.random() * 1e9)


app.get('/api/persons', (request, response) => {
    response.json(notes)
})

app.get('/info', (request, response) => {
    const numPeople = notes.length
    const date = new Date()
    const info = `<p>Phonebook has info for ${numPeople} people</p>
    <p>${date.toString()}</p>`
    response.end(info)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(n => n.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(n => n.id === id)
    if (note) {
        notes = notes.filter(n => n.id !== id)
        response.status(202).json(note)
    } else {
        response.status(204).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!(body.name && body.number)) {
        return response.status(400).end()
    }

    const note = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    
    notes = notes.concat(note)

    response.status(201).json(note)
})

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);