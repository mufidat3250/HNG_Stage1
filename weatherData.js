let location, temperature;

const url = "https://api.openweathermap.org/data/2.5/weather";
const params = {
  lat: 40.7128,
  lon: -74.006,
  appid: process.env.API_Key,
  units: "metric",
};

const queryString = new URLSearchParams(params).toString();
const fullurl = `${url}?${queryString}`;
async function fetchweatherData() {
  try {
    const response = await fetch(fullurl);
    if (!response.ok) {
      throw new Error(`Faild to retrieve data ${response.status}`);
    }
    const weatherData = await response.json();
    location = weatherData.name;
    temperature = weatherData.main.temp;
    // console.log(location)
  } catch (error) {
    console.log(error);
  }
  return { temperature, location };
}
module.exports = fetchweatherData