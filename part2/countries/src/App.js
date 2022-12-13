import { useState, useEffect } from "react"
import axios from 'axios'


const ListOfCountries = ({countries}) => {

  const [ countryToShow, setCountryToShow ] = useState(null)

  const handleShow = (country) => () => {
    setCountryToShow(country)
  }

  const mapper =  (country) => {
    const key = country.cc
    const name = country.name
    return (
      <p key={key}>
        {name}
        <button onClick={handleShow(country)}>show</button>
      </p>
    )
  }

  return (
    <div>
      <div>
        {countries.map(mapper)}
      </div>
      {countryToShow ? <DetailedCountry country={countryToShow} /> : <></> }
    </div>
  )
}

const CountryHeader = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Languages = ({languages}) => {
  return (
    <div>
      <h3>Languages:</h3>
      <ul>
        {languages.map((lang) => <li key={lang}>{lang}</li>)}
      </ul>
    </div>
  )
}

const Flag = ({flag, name}) => {
  return (
    <div>
      <img src={flag} alt={"The flag of " + name} />
    </div>
  )
}

const Capital = ({capital}) => {
  return (
    <>
      <p>capital {capital}</p>
    </>
  )
}

const Area = ({ area }) => {
  return (
    <>
      <p>area {area}</p>
    </>
  )
}

const BasicData = ({country}) => {
  return (
    <div>
      <Capital capital={country.capital}/>
      <Area area={country.area}/>
    </div>
  )
}

const WeatherHeader = ({city}) => (
  <>
    <h2>Weather in {city}</h2>
  </>
)

const Temperature = ({temp}) => {
  const K = 273.15
  const temperature = Math.round((temp - K) * 100) / 100
  return (
    <>
      <p>temperature {temperature} Celcius</p>
    </>
  )
}

const WeatherIcon = ({icon, description}) => (
  <div>
    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="few clouds" />
  </div>
)

const Wind = ({wind}) => (
  <div>
    <p>wind {wind.speed} m/s</p>
  </div>
)

const Weather = ({city}) => {

  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api_key}`
      )
      .then(
        response => {
          console.log(response.data.weather);
          setWeatherData(response.data)
        }
      )
  },[city])

  if (!weatherData) {
    return <></>
  }

  return (
    <div>
      <WeatherHeader city={city} />
      <Temperature temp={weatherData.main.temp} />
      <WeatherIcon
        icon={weatherData.weather[0].icon}
        description={weatherData.weather[0].description}
      />
      <Wind wind={weatherData.wind} />
    </div>
  );
}

const DetailedCountry = ({country}) => {
  return (
    <div>
      <CountryHeader text={country.name} />
      <BasicData country={country} />
      <Languages languages={country.languages} />
      <Flag flag={country.flag} name={country.name}/>
      <Weather city={country.capital}/>
    </div>
  )
}

const Result = ({countries}) => {
  const numCountries = countries.length
  if (numCountries > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  if (numCountries > 1) {
    return (
      <ListOfCountries countries={countries}/>
    )
  }
  if (numCountries === 1) {
    return (
      <DetailedCountry country={countries[0]}/>
    )
  }
  return (
    <></>
  )
}

const App = () => {

  const [ query, setQuery ] = useState("")
  const [ countries, setCountries ] = useState([])

  const handleQuery = (event) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    console.log('effect');
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        const filterData = (country) => (
          {
            name: country.name.common,
            cc: country.cca2,
            capital: country.capital ? country.capital[0] : "",
            languages: country.languages ? Object.values(country.languages) : [],
            area: country.area,
            flag: country.flags.png
          }
        )
        setCountries(response.data.map(filterData))
      })
  }, [])

  

  const filteredCountries = () => {
    const filterString = query.toLowerCase()
    const filterEngine = (country) => (
      country.name.toLowerCase().includes(filterString)
    )
    return countries.filter(filterEngine)
  }

  return(
    <div>
      <p>find countries <input value={query} onChange={handleQuery} /></p>
      <Result countries={filteredCountries()}/>
    </div>
  )
}

export default App;
