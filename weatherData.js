let location, temperature;

const url = "https://api.openweathermap.org/data/2.5/weather";
async function fetchweatherData() {
  const geolocation = await fetch(`https://ipapi.co/json/`);
  const geolocationResponse = await geolocation.json();
  const params = {
    lat: geolocationResponse.latitude,
    lon: geolocationResponse.longitude,
    appid: process.env.API_Key,
    units: "metric",
  };
  const queryString = new URLSearchParams(params).toString();
  const fullurl = `${url}?${queryString}`;

  try {
    const response = await fetch(fullurl);
    if (!response.ok) {
      throw new Error(`Faild to retrieve data ${response.status}`);
    }
    const weatherData = await response.json();
    location = weatherData.name;
    temperature = weatherData.main.temp;
  } catch (error) {
    console.log(error);
  }
  return { temperature, location };
}
module.exports = fetchweatherData;
