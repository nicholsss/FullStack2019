import React from "react";

const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handlePersonChange,
  handleNumberChange
}) => {
  return (
    //<input value={value} onChange={onChange} />
    <div>
      <form onSubmit={addPerson}>
        nimi: <input value={newName} onChange={handlePersonChange} />
        <div>
          numero: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  );
};
export default PersonForm;
