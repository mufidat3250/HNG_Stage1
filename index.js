require("dotenv").config();
const express = require("express");
const app = express();
const fetchweatherData = require('./weatherData')
const cors = require("cors");
const axios = require('axios')
const unknownEEndpoint = require('./middleware/unknownEndpoint')

app.use(cors());
app.use(express.json());

app.get("/", (req, response) => {
    response.send(`hello people`)
})


app.get("/api/hello", async (request, response) => {
  const { visitor_name } = request.query;
  const ipAddress = request.ip;
  const clientIP = 
  request.headers["cf-connecting-ip"] ||
  request.headers["x-real-ip"] ||
  request.headers["x-forwarded-for"] ||
  request.connection.remoteAddress;

  const filteredVisitorsName = visitor_name.replace('\"', "") 
  try {
  const locationRes = await axios.get(`https://ipinfo.io/${clientIP}?token=174824aeaf0f45`)
  const city = locationRes.data.city || 'New York'
  const {location, temperature} = await fetchweatherData(city)
  response
    .status(200)
    .json({
      client_IP: ipAddress,
      visitor_name: filteredVisitorsName,
      location,
      greeting: `Hello, ${visitor_name}!, the temperature is ${temperature} degrees Celcius in ${location}`,
    });
  } catch (error) {
    console.log(error)
  }
});
app.use(unknownEEndpoint)
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
