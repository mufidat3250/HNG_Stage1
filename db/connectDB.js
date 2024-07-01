require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MongoDB_URL

mongoose.connect(url).then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const clientSchema = mongoose.Schema({
    visitor_name:String,
    client_IP: String,
    location: String,
    greeting: String
})



clientSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Client', clientSchema)
