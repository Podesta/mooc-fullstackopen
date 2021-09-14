import React from 'react';
import PrintSinglePerson from './PrintSinglePerson';

const PrintPersons = ({ filteredPersons, handleDelete }) => (
  filteredPersons.map(person =>
    <PrintSinglePerson
      key={person.name}
      name={person.name}
      number={person.phone}
      handleDelete={() => handleDelete(person.id)}
    />
  )
);

export default PrintPersons;
