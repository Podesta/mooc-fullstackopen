import React, { useState, useEffect } from 'react';
import axios from 'axios';


const DisplayCountry = ({ countryData }) => {
  const [weatherData, setWeatherData] = useState([]);

  const api_weather_key = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${countryData.capital}&appid=${api_weather_key}`)
      .then(response => {
        console.log(response);
        setWeatherData(response.data);
        console.log(response.data.weather[0].icon);
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
      {weatherData.main // Prevents errors if we can't access the data from the api
        ? (
          <div>
            <h3>Weather in {countryData.capital}</h3>
            Temperature: {Math.round(weatherData.main.temp - 273.15)}°C <br/>
            Humidity: {weatherData.main.humidity}% <br/>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather icon" />
          </div>)
        : ''
      }
    </div>
  );
}

export default DisplayCountry;
