require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

morgan.token('body', (request, _response) => {
  return request.method === 'POST'
    ? JSON.stringify(request.body)
    : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  Person
    .countDocuments({})
    .then(count => {
      response.send(`
        <p>Phonebook has info for ${count} people<p>
        <p>${new Date()}<p>
      `)
    })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name and/or number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id).then(person => {
    response.json(person)
  })
})

