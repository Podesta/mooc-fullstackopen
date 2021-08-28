import React from 'react';

const DisplayUpToTen = ({ countries }) => (
  <div>
    {countries.map(country =>
    <div key={country.alpha3Code}>
      {country.name}
    </div>)}
  </div>
);

export default DisplayUpToTen;
