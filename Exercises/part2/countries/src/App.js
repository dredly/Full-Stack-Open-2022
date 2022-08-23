import { useState, useEffect } from 'react';
import axios from 'axios';

const CountrySearch = ({ search, handleChange }) => {
  return (
    <>
      <label htmlFor="country-search-input">find countries </label>
      <input value={search} id="country-search-input" onChange={handleChange} />
    </>
  )
}

const CountryList = ({ countries, handleShow }) => {
  return (
    <ul>
      {countries.map(result => (
        <li key={result.cca3}>{result.name.common} <button value={result.name.common} onClick={handleShow}>show</button></li>
      ))}
    </ul>
  )
}

const CountryDetails = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.keys(country.languages).map(langKey => (
          <li key={langKey}>{country.languages[langKey]}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      <Weather country={country} />
    </>
  )
}

const SearchOutcome = ({ results, handleShow }) => {
  if (results.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  if (results.length > 1 && results.length <= 10) {
    return <CountryList countries={results} handleShow={handleShow} />
  }
  if (results.length === 1) {
    return <CountryDetails country={results[0]} />
  }
  return <p>No results</p>
}

const Temperature = ({ temperature }) => (
  <p>Temperature {parseFloat(temperature).toFixed(2)} celsius</p>
)

const Wind = ({ wind }) => (
  <p>wind {parseFloat(wind).toFixed(2)} m/s</p>
)

const WeatherIcon = ({ src }) => (
  <img src={src} />
)

const Weather = ({ country }) => {
  const [temperature, setTemperature] = useState('');
  const [wind, setWind] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [lat, lng] = country.capitalInfo.latlng;
  const api_key = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`;
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setTemperature(response.data.main.temp - 272.15);
        setWind(response.data.wind.speed);
        const iconCode = response.data.weather[0].icon;
        setIconUrl(`https://openweathermap.org/img/wn/${iconCode}@2x.png`);
      })
  }, []);

  return (
    <>
      <h2>Weather in {country.capital[0]}</h2>
      <Temperature temperature={temperature} />
      <WeatherIcon src={iconUrl} />
      <Wind wind={wind} />
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setResults(response.data);
      })
  }, []);

  const handleChange = evt => {
    setSearch(evt.target.value);
    setResults(countries.filter(country => (
      country.name.common.toLowerCase().includes(evt.target.value.toLowerCase())
    )));
    // console.log(results.map(result => result.name.common));
  }

  const handleShow = evt => {
    setSearch(evt.target.value);
    setResults(countries.filter(country => (
      country.name.common.toLowerCase().includes(evt.target.value.toLowerCase())
    )));
  }

  return (
    <div>
      <CountrySearch search={search} handleChange={handleChange} />
      <SearchOutcome results={results} handleShow={handleShow} />
    </div>
  );
}

export default App;
