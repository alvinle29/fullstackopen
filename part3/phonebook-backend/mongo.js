const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://alvinle29:${password}@cluster0.7rfvrzo.mongodb.net/db1?retryWrites=true&w=majority`

mongoose.connect(url, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
})
  .then(() => console.log('connected to MongoDB'))

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// Display all entires in phonebook if password only parameter
if (process.argv.length === 3) {
  Person
    .find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}

// Add person to phonebook if name and number provided
if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({ name, number })

  person
    .save()
    .then(result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      mongoose.connection.close()
    })
}