import React, { useState } from 'react';
import DisplayCountry from './DisplayCountry';

const DisplayUpToTen = ({ countries }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [countryCode, setCountryCode] = useState('');

  // Using handler because I need to pass an argument, the country that matches, so the button
  // renders only the specific country that was clicked.
  // The condition on the ternary requires that both showInfo is true, and there is match with
  // the countryCode and country.alpha3Code. Because of this, I can default showInfo to true and
  // rely on the countryCode check. The showInfo will only be set to false if I'm clicking on the
  // same button again, this way, a second click on the button hides the current country.
  const handleButton = (country) => {
    const handler = () => {
      if (country.alpha3Code === countryCode) {
        setShowInfo(!showInfo)
      } else {
        setShowInfo(true);
      }
      setCountryCode(country.alpha3Code);
    }
    return handler;
  }


  return (
    <div>
      {countries.map(country =>
      <div key={country.alpha3Code}>
        {country.name} <button onClick={handleButton(country)}>show</button>
        {showInfo && countryCode === country.alpha3Code
        ? <DisplayCountry countryData={country} />
        : ''}
      </div>)}
    </div>
  );
}

export default DisplayUpToTen;
