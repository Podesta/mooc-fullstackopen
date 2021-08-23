import React from 'react';
import PrintSinglePerson from './PrintSinglePerson';

const PrintPersons = ({ filteredPersons }) => (
  filteredPersons.map(person =>
    <PrintSinglePerson key={person.name} name={person.name} number={person.number} />
  )
);

export default PrintPersons;
