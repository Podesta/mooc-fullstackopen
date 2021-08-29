import React, { useState, useEffect } from 'react';
import axios from 'axios';


const DisplayCountry = ({ countryData }) => {
  const [weatherData, setWeatherData] = useState(null);

  const api_weather_key = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_weather_key}&query=${countryData.capital}`)
      .then(response => {
        console.log(response);
        setWeatherData(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [api_weather_key, countryData]);

  return (
    <div>
      <h2>{countryData.name}</h2>
      Capital: {countryData.capital} <br/>
      Population: {countryData.population}
      <h3>Languages</h3>
      <ul>
        {countryData.languages.map(language =>
        <li key={language.iso639_2}>{language.name}</li>)}
      </ul>
      <img src={countryData.flag} alt={`Flag of ${countryData.name}`} height="150" />
      {weatherData && weatherData.temperature // Prevents errors if we can't access the data from the api
        ? (
          <div>
            <h3>Weather in {countryData.capital}</h3>
            Temperature: {weatherData.current.temperature}°C <br/>
            Humidity: {weatherData.current.humidity} % <br/>
          </div>)
        : ''
      }
    </div>
  );
}

export default DisplayCountry;
