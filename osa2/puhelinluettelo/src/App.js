import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/contacts";
import Notification from "./components/Notification";
import "./index.css";

/*
const footerStyle = {
  color: "red",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom:" 10px",
};
*/
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [newMessage, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data);
    });
  }, []);
  const handlePersonChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = event => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleFilterChange = event => {
    setNewFilter(event.target.value);
  };
  const personsToShow = newFilter
    ? persons.filter(person =>
        person.name.toUpperCase().includes(newFilter.toUpperCase())
      )
    : persons;

  const remove = event => {
    event.preventDefault();

    console.log(event.target.value);
    const removeId = event.target.value;

    const person = persons.find(person => person.id == removeId);
    if (window.confirm(`poistetaanko ${person.name}`)) {
      let filtered = persons.filter(person => person.id != removeId);
      personService.remove(removeId).then(response => {
        setPersons(filtered);
      });
      setMessage(`poistettiin '${person.name}'`);
    }
  };

  const addPerson = event => {
    event.preventDefault();

    if (persons.find(person => person.name === newName)) {
      if (
        window.confirm(
          `${newName} on jo luettelossa, korvataanko vanha numero uudella`
        )
      ) {
        const updated = persons.find(person => person.name == newName);

        const personObject = {
          name: newName,
          number: newNumber
        };

        personService
          .update(updated.id, personObject)
          .then(response => {
            console.log(response);
            setMessage(`Paivitettiin '${newName}' numero`);
            setPersons(
              persons.map(person =>
                person.id !== updated.id ? person : response.data
              )
            );
          })
          .catch(error => {
           setMessage(`Henkilön '${newName}' oli poistettu`);
           
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
        // id:persons.lenght +1
      };
      personService.create(personObject).then(response => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
      setMessage(`Lisättiin '${newName}'`);
    }
  };
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification message={newMessage} />
      rajaa näytettäviä:{" "}
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>lisää uusi</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numerot</h2>
      <Persons rows={personsToShow} poista={remove} />
    </div>
  );
};

export default App;
