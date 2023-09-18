require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length < 2) {
  console.log('Incorrect arguments.')
  console.log('Usage: node mongo.js <password> "<name>" "<number>"')
  process.exit(1)
}

const url = `${process.env.MONGODB_URI}puhlu-reborn`
mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const getPersons = () => {
  mongoose.connect(url)
  Person.find({}).then(result => {
    result.forEach(p => {
      console.log(p)
    })
    mongoose.connection.close()
  })
}

const savePerson = (name, number) => {
  mongoose.connect(url)
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 2) {
  getPersons()
} else {
  savePerson(process.argv[2], process.argv[3])
}