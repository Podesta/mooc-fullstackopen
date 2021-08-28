import React from 'react';

const DisplayTooMany = ({ countries }) => (
  <div>
    <p>There are {countries.length} matches. Specify another filter.</p>
  </div>
);

export default DisplayTooMany;
