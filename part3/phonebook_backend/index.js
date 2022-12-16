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

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);