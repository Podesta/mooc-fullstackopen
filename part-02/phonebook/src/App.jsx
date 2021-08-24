import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PrintSubTitle from './components/PrintSubtitle';
import AddNewPerson from './components/AddNewPerson';
import PrintPersons from './components/PrintPersons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response =>
      setPersons(response.data)
    );
  }, []);


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

    if (persons.some(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
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
