import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather2.css';
import sunnyImage from './Assets/sunny.png';
import cloudyImage from './Assets/cloudy.png';
import lightRainImage from './Assets/light_rain.png';
import rainyImage from './Assets/rainy.png';
import drizzleImage from './Assets/drizzle.png';
import thunderstormImage from './Assets/thunderstorm.png';
import mistImage from './Assets/mist.png';
import showerRainImage from './Assets/shower_rain.png';
import defaultImage from './Assets/default.png';
import sunriseImage from './Assets/sunrise.png';
import sunsetImage from './Assets/sunset.png';
import moonriseImage from './Assets/moonrise.png';
import moonsetImage from './Assets/moonset.png';
import PlanetTable from './planetTable';

const Weather2 = ({ onCityChange }) => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [moonData, setMoonData] = useState(null);
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [starGazingOptimal, setStarGazingOptimal] = useState('');

  useEffect(() => {
    if (latitude && longitude) {
      fetchAstronomyData();
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (moonData && sunrise) {
      const moonriseTime = new Date(`2024-03-21 ${moonData.moonrise}`);
      const sunriseTime = new Date(`2024-03-21 ${sunrise}`);
      const timeDifference = (moonriseTime.getTime() - sunriseTime.getTime()) / (1000 * 60 * 60); // in hours

      if (timeDifference < 9) {
        setStarGazingOptimal('Not optimal');
      } else if (timeDifference < 10) {
        setStarGazingOptimal('Fair conditions');
      } else {
        setStarGazingOptimal('Optimal conditions');
      }
    }
  }, [moonData, sunrise]);

  const fetchAstronomyData = async () => {
    try {
      const response = await axios.get('https://api.ipgeolocation.io/astronomy', {
        params: {
          apiKey: 'e4c7b9448c694ef89768b0acf5ac27db',
          lat: latitude,
          long: longitude
        }
      });

      const { sunrise, sunset, moonrise, moonset } = response.data;
      setSunrise(sunrise);
      setSunset(sunset);
      setMoonData({ moonrise, moonset });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0eb6fccdfb4dc326cd05c87f99c91444`
      );
      const weatherResponse = response.data;
      setWeatherData(weatherResponse);
      onCityChange(city);

      const geoResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=0eb6fccdfb4dc326cd05c87f99c91444`
      );
      const geoData = geoResponse.data[0];
      const latitude = geoData.lat;
      const longitude = geoData.lon;

      setLatitude(latitude);
      setLongitude(longitude);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const getWeatherIcon = (weatherCondition, weatherDescription) => {
    switch (weatherCondition) {
      case 'Clear':
        return defaultImage;
      case 'Clouds':
        return cloudyImage;
      case 'Rain':
        if (weatherDescription && weatherDescription.toLowerCase().includes('light rain')) {
          return lightRainImage;
        } else {
          return rainyImage;
        }
      case 'Drizzle':
        return drizzleImage;
      case 'Thunderstorm':
        return thunderstormImage;
      case 'Mist':
        return mistImage;
      case 'Shower Rain':
        return showerRainImage;
      case 'Sunny':
        return sunnyImage;
      default:
        return defaultImage;
    }
  };

  const calculateStarGazingDuration = () => {
    const moonriseTime = new Date(`2024-03-21 ${moonData.moonrise}`);
    const sunriseTime = new Date(`2024-03-21 ${sunrise}`);
    const timeDifference = (moonriseTime.getTime() - sunriseTime.getTime()) / (1000 * 60 * 60); // in hours
    return timeDifference.toFixed(2) + ' hours';
  };
  

  return (
    <div className='weather-container'>
      <form className='weather-form' onSubmit={handleSubmit}>
        <input
          className='weather-input'
          type="text"
          placeholder="Search Location..."
          value={city}
          onChange={handleInputChange}
        />
      </form>

      {weatherData && (
        <div className='weather-box-container'>
          <div className='weather-info'>
            <h2>Today</h2>
            <img
              className='weather-image'
              src={getWeatherIcon(weatherData.weather[0].main)}
              alt="Weather Icon"
            />
            <p> <h1><b>{weatherData.name}</b></h1> {weatherData.main.temp}°C</p>
          </div>
        </div>
      )}

      {moonData && (
        <div className='moon-data'>
          <p><img src={moonriseImage} alt="Moonrise" /> Moon Rise: {moonData.moonrise}</p>
          <p><img src={moonsetImage} alt="Moonset" /> Moon Set: {moonData.moonset}</p>
          <p><img src={sunriseImage} alt="Sunrise" /> Sunrise: {sunrise}</p>
          <p><img src={sunsetImage} alt="Sunset" /> Sunset: {sunset}</p>
        </div>
      )}

{starGazingOptimal && (
  <div className="star-gazing-info">
    Star Gazing: {starGazingOptimal}
    <div className="star-gazing-duration">Duration: {calculateStarGazingDuration()}</div>
  </div>
)}


      {latitude && longitude && <PlanetTable latitude={latitude} longitude={longitude} />}
    </div>
  );
};

export default Weather2;
