import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ country, handleCountry }) => {
  return (
      <div>
        find country: <input value={country} onChange={handleCountry} />
      </div>
  );
}

const DisplayCountry = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter.
      </div>
    );
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country =>
        <div key={country.alpha3Code}>
          {country.name}
        </div>
        )}
      </div>
    );
  } else if (countries.length === 1) {
    return (
      <div>
        <h3>{countries[0].name}</h3>
        <p>capital: {countries[0].capital}<br/>
           population: {countries[0].population}
        </p>
      </div>
    );
  } else {
    return (
      <>
      </>
    );
  }
}

const App = () => {
  const [country, setCountry] = useState('');
  const [found, setFound] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      const match = response.data.filter(singleCountry => singleCountry.name.toLowerCase().includes(country.toLowerCase()));
      setFound(match);
    });
  }, [country]);

  const handleCountry = (event) =>
    setCountry(event.target.value);

  return (
    <div>
      <SearchBar handleCountry={handleCountry} country={country} />
      <DisplayCountry countries={found} />
    </div>
  );
}

export default App;
