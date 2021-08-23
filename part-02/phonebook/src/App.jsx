import React, { useState } from 'react';
import Filter from './components/Filter';
import PrintSubTitle from './components/PrintSubtitle';
import AddNewPerson from './components/AddNewPerson';
import PrintPersons from './components/PrintPersons';

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
    ? persons
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
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName} />
      <PrintSubTitle title="Add number" />
      <AddNewPerson submitAction={addPerson} newName={newName} newPhone={newPhone}
        handleNewPhone={handleNewPhone} handleNewName={handleNewName}/>
      <PrintSubTitle title="Numbers" />
      <PrintPersons filteredPersons={filteredPersons} />
    </div>
  );
}

export default App;
