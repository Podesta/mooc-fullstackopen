import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas'
    },
    {
      name: 'Ada Lovelace'
    }
  ]);

  const [newName, setNewName] = useState('');

  const addNewName = (event) => {
    setNewName(event.target.value);
  }

  const addNumber = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input onChange={addNewName} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person =>
        <div key={person.name}>
          {person.name}
        </div>)}
    </div>
  );
}

export default App;
