import React from 'react';

const SearchBar = ({ country, handleCountry }) => (
  <div>
    find country: <input value={country} onChange={handleCountry} type="text" />
  </div>
);

export default SearchBar;
