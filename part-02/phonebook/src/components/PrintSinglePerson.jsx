import React from 'react';

const PrintSinglePerson = ({ name, number, handleDelete }) => (
  <div>
    {name} {number} <button onClick={handleDelete} type="text">delete</button>
  </div>
);

export default PrintSinglePerson;
