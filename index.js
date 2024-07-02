require("dotenv").config();
const express = require("express");
const app = express();
const fetchweatherData = require('./weatherData')
const unknownEndpoint = require("./middleware/unknownEndpoint");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, response) => {
    response.send(`hello world`)
})


// app.get("/api/hello", async (request, response) => {
//   const { visitor_name } = request.query;
//   const ipAddress = request.ip.slice(7);
//   const {location, temperature} = await fetchweatherData()
//   response
//     .status(200)
//     .json({
//       client_IP: ipAddress,
//       visitor_name: visitor_name,
//       location,
//       greeting: `Hello, ${visitor_name}!, the temperature is ${temperature} degrees Celcius in ${location}`,
//     });
// });
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
