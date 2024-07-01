const unknownEndPoint = (request, response) => {
response.response.status(404).send({error: 'Unknown Endpoint'})
}

module.exports = unknownEndPoint