import React, { useEffect, useState } from "react";
import InputCity from "./Components/InputCity";
import Header from "./Components/Header";
import ShowWeather from "./Components/ShowWeather"
import "./styles.css";

export default function App() {
  const [weatherData, setWeatherData] = useState({});
  const [inputCity, setInputCity] = useState("Seattle");
  const [cityName, setCityName] = useState("Seattle");
  const [error, setError] = useState(false);

  //  Input element handler
  const inputHandler = (e) => {
    setInputCity(e.target.value);
  };

  //  Search button
  const submitHandler = (e) => {
    e.preventDefault();
    setError(false);
    setCityName(inputCity);
  };

  //  Weather API
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=41a89a5fca769d935be798979c920566
`;


  //  Fetching weather data
  async function fetchData(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    if (data.cod === "404") {
      setError(true);
    } else {
      setWeatherData(data);
    }
  }

  //  To fetch weather data
  useEffect(() => {
    fetchData(URL);
  }, [URL]);

  return (
    <div>
      <Header />

      <InputCity
        city={inputCity}
        onInputHandler={inputHandler}
        onSubmitHandler={submitHandler} />
         {error ? (
        <h3 className="error">No data found :( </h3>
      ) : (
          <ShowWeather data={weatherData} />
        )}
    </div>
  );
}
