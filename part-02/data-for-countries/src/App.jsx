import React, { useState, useEffect } from 'react';

const SearchBar = ({ country, handleCountry }) => {
  return (
      <div>
        find country: <input value={country} onChange={handleCountry} />
      </div>
  );
}

const App = () => {
  const [country, setCountry] = useState('');

  const handleCountry = (event) =>
    setCountry(event.target.value);

  return (
    <SearchBar handleCountry={handleCountry} country={country} />
  );
}

export default App;
