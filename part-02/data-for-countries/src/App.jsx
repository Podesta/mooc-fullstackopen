import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayCountry from './components/DisplayCountry';
import DisplayTooMany from './components/DisplayTooMany';
import DisplayUpToTen from './components/DisplayUpToTen';

const SearchBar = ({ country, handleCountry }) => {
  return (
      <div>
        find country: <input value={country} onChange={handleCountry} />
      </div>
  );
}

const DisplayList = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <DisplayTooMany countries={countries} />
    );
  } else if (countries.length > 1) {
    return (
      <DisplayUpToTen countries={countries} />
    );
  } else if (countries.length === 1) {
    return (
      <DisplayCountry countryData={countries[0]} />
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
      <DisplayList countries={found} />
    </div>
  );
}

export default App;
