import React from "react";


const Persons = ({ rows, poista }) =>{
  return rows.map(person => 
    <p key={person.id}>
     
      {person.name} {person.number}
      <button value={person.id} onClick={poista}>poista</button>
    </p>
  );
}

export default Persons;
