import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayList from './components/DisplayList';
import SearchBar from './components/SearchBar';

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
      {country.length === 0   // If nothing is typed, do not display list
        ? ''
        : <DisplayList countries={found} />}
    </div>
  );
}

export default App;
