import React, { useState } from 'react';

const PrintFiltered = ({ filteredPersons }) => (
  <>
    {filteredPersons.map(person =>
    <div key={person.name}>
      {person.name}
    </div>
    )}
  </>
);

const PrintSinglePerson = ({ name, number }) => (
  <div key={name}>
    {name} {number}
  </div>
);


const PrintAllPersons = ({ persons }) => (
  persons.map(person =>
    <PrintSinglePerson name={person.name} number={person.number} />
  )
);

const AddNewPerson = ({ submitAction, newName, newPhone, handleNewName, handleNewPhone}) => {
  return (
    <form onSubmit={submitAction}>
      <div>
        name: <input value={newName} onChange={handleNewName}/>
      </div>
      <div>
        number: <input value={newPhone} onChange={handleNewPhone}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

const PrintTitle = ({ title }) =>
  <h2>{title}</h2>


const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number : '9999999'
    },
    {
      name: 'Ada lovelace',
      number: '123456'
    }
  ]);

  const [newName, setNewName] = useState('Enter new name');
  const [newPhone, setNewPhone] = useState('123456789');
  const [filterName, setFilterName] = useState('');

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  }
  
  // If nothing si typed on searchbar, return empty array
  const filteredPersons = (filterName === '')
    ? []
    : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()));


  const handleNewName = (event) =>
    setNewName(event.target.value);

  const handleNewPhone = (event) => 
    setNewPhone(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newPhone
    }

    if (persons.some(person => person.name === newPerson.name)) {
      window.alert(`${newPerson.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewPhone('');
    }
  }


  return (
    <div>
      <PrintTitle title="PhoneBook" />
      <div>
        filter shown with <input value={filterName} onChange={handleFilterName}/>
      </div>
      <div>
        <PrintFiltered filteredPersons={filteredPersons} />
      </div>
      <PrintTitle title="Add number" />
      <AddNewPerson submitAction={addPerson} newName={newName} newPhone={newPhone}
      handleNewPhone={handleNewPhone} handleNewName={handleNewName}/>
      <PrintTitle title="Numbers" />
      <PrintAllPersons persons={persons} />
    </div>
  );
}

export default App;
