import React from 'react';

const DisplayCountry = ({ countryData }) => (
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
  </div>
);

export default DisplayCountry;
