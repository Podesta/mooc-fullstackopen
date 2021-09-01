import React, { useState, useEffect } from 'react';
import personsService from './services/persons.jsx';
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
    personsService
      .getAll()
      .then(persons => {
        setPersons(persons)
      });
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
      const existingPerson = persons.find(person => person.name === newPerson.name);

      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(existingPerson.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person =>
              person.id === existingPerson.id ? updatedPerson : person))
            setNewName('');
            setNewPhone('');
            console.log(updatedPerson);
          })
      }
    } else {
      personsService
        .create(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson));
          setNewName('');
          setNewPhone('');
        });
    }
  }

  const handleDelete = (id) => {
    const toRemove = persons.find(person => person.id === id);

    if(!window.confirm(`Delete ${toRemove.name}?`)) {
      return;
    }

    personsService
      .remove(id)
      .then(res => {
        console.log('removed');
        console.log(res);
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(e => {
        console.log(e);
        alert(`${toRemove.name} with id ${id} was already deleted from server`);
        setPersons(persons.filter(person => person.id !== id));
      })
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName} />
      <PrintSubTitle title="Add number" />
      <AddNewPerson submitAction={addPerson} newName={newName} newPhone={newPhone}
        handleNewPhone={handleNewPhone} handleNewName={handleNewName}/>
      <PrintSubTitle title="Numbers" />
      <PrintPersons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
