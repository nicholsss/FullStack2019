import React, { useState, useEffect } from "react";

import axios from "axios";
const App = () => {
  const [countrys, setCountrys] = useState([]);
  const [weathers, setWeather] = useState([]);
  const [filter, filterCountry] = useState("");

  const hook = () => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      console.log("promise fulfilled");
      console.log(response.data);
      setCountrys(response.data);
    });
  };

  useEffect(hook, []);
  console.log("country name", countrys.name);

  /*console.log("ok", filter);
  const weather = () => {
    console.log("effect");
    axios
      .get(
        `https://api.apixu.com/v1/current.json?key=3cae33456fbd49b9a9185226192803&q=${filter}`
      )
      .then(response => {
        console.log("promise fulfilled");
        console.log(response.data);
        setWeather(response.data);
      });
  };
  
  console.log("Weather", weathers);
*/
  const handleCountryChange = event => {
    console.log(event.target.value);
    filterCountry(event.target.value);
  };

  const countryToShow = filter
    ? countrys.filter(country =>
        country.name.toUpperCase().includes(filter.toUpperCase())
      )
    : countrys;

  const rows = () => {
    if (countryToShow.length > 10 || countryToShow.length < 0) {
      return <p>Too many matches,specify another filter</p>;
    } else if (countryToShow.length > 1) {
      return countryToShow.map(country => (
        <p key={country.name}>
          {country.name}
          <button value={country.name} onClick={handleCountryChange}>
            show
          </button>
        </p>
      ));
    } else {
      return countryToShow.map(country => (
        <div key={country.name}>
          <h1>{country.name}</h1>
          <p>{country.capital} </p>
          <p>{country.population} </p>
          <h1>Languages</h1>
          <ul>
            {country.languages.map(language => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img
            src={country.flag}
            width="300"
            height="200"
            alt="W3Schools.com"
          />
       
        </div>
      ));
    }
  };

  //countryToShow.map(country => <p key={country.name}>{country.name}</p>);

  return (
    <div>
      <p>
        Find countries <input value={filter} onChange={handleCountryChange} />
      </p>
      {rows()}
    </div>
  );
};

export default App;
