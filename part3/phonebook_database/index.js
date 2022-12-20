require('dotenv').config()
const express = require("express")
const app = express()
const morgan = require('morgan') // Fancy logger for node.js
const cors = require('cors')

const Person = require('./models/person')

app.use(express.static('build'))

app.use(cors())

app.use(express.json())

// morgan
morgan.token("body", (request) => {
  return JSON.stringify(request.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

/*
 logging data even in the console can be dangerous
 since it can contain sensitive data and may violate 
 local privacy law (e.g. GDPR in EU) or business-standard.
*/

let persons = [
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

const nameInPersons = (name) => {
    return persons.find(p => p.name === name) || false
}


app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    Person.find({}).then(persons =>{
        const numPeople = persons.length
        const date = new Date()
        const info = `<p>Phonebook has info for ${numPeople} people</p>
            <p>${date.toString()}</p>`
        response.end(info)   
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            console.log(`id: ${request.params.id} is deleted.`);
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (!(body.name && body.number)) {
        return response.status(400).json({
            error: 'both name and number are required'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then((savedPerson) => {
        response.status(201).json(savedPerson)
    })
    .catch(error => next(error))
    
})

app.put('/api/persons/:id', (request, response, next) => {
    const newPerson = request.body
    const id = Number(request.params.id)
    
    if (!(newPerson.number && newPerson.name)) {
        response.status(400).json({
            error: "both name and number field must be filled"
        })
    }

    if (!(persons.find(p => p.id === id))) {
        response.status(400).json({
            error: `id:${id} is already deleted`
        })
    }

    persons = persons.filter(p => p.id !== id)
    persons = persons.concat(newPerson)

    response.status(200).json(newPerson)
})

const unknownEndPoint = (request, response) => {
    response.status(404).json({ error: 'unknown endpoint'})
}
app.use(unknownEndPoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
      return response.status(400).send({ error: "malformatted id" });
    }

    next(error);
}
app.use(errorHandler)


const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);