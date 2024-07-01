require('dotenv').config()
const express = require('express')
const app = express()
const Client = require('./db/connectDB')
const unknownEndpoint = require('./middleware/unknownEndpoint')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())



app.post('/api/hello', async(request, response)=> {
    const body = request.body
    try {
        const newClient = new Client(body)
        const savedItem = await newClient.save()
        response.status(201).json(savedItem)

    } catch (error) {
        response.status(400).send(error)
    }
})

app.get('/api/hello', async(request, response) => {
    const {visitor_name} = request.query
    console.log(visitor_name)
    const queryObject = {}
   
    let client =  Client.find(queryObject)
    if(visitor_name){
        queryObject.visitor_name = visitor_name
        client = Client.findOne(queryObject)
    }
    
    const result = await client
    response.status(200).json(result)
  })
  
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})