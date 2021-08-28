import React from 'react';
import DisplayCountry from './DisplayCountry';
import DisplayTooMany from './DisplayTooMany';
import DisplayUpToTen from './DisplayUpToTen';

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
  }
  console.log('ERROR WITH API');
  return null;
}

export default DisplayList;
