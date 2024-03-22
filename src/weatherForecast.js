import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './weatherForecast.css'; // Corrected import statement for CSS file
import sunnyImage from './Assets/sunny.png'; // Image for Clear sky
import cloudyImage from './Assets/cloudy.png'; // Image for Clouds
import lightRainImage from './Assets/light_rain.png'; // Image for Light Rain
import rainyImage from './Assets/rainy.png'; // Image for Rain
import drizzleImage from './Assets/drizzle.png'; // Image for Drizzle
import thunderstormImage from './Assets/thunderstorm.png'; // Image for Thunderstorm
import mistImage from './Assets/mist.png'; // Image for Mist
import showerRainImage from './Assets/shower_rain.png'; // Image for Shower Rain
import defaultImage from './Assets/default.png'; // Default image (if weather condition is not matched)
const WeatherForecast = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);



  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=0eb6fccdfb4dc326cd05c87f99c91444`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  const filterForecastFor12PM = (forecastList) => {
    return forecastList.filter((forecast) => {
      return forecast.dt_txt.endsWith(' 12:00:00');
    });
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
  
  
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek];
  };

  // Get the button element
  //const moreInfoButton = document.getElementById('more-info-btn');

  // Get all the pop-up elements
  //const popups = document.querySelectorAll('.popup');

  // Add event listener to the button
  //moreInfoButton.addEventListener('click', function() {
    // Toggle visibility of pop-up elements
    //popups.forEach(function(popup) {
      //if (popup.style.opacity === '0') {
        //popup.style.opacity = '1';
     //} else {
       // popup.style.opacity = '0';
      //}
    //});
 // });
  

  return (
    <div className='weather-container-2'>
      {weatherData &&
        filterForecastFor12PM(weatherData.list).map((forecast, index) => (
          <div className='weather-box' key={index}>
            <p className='stays'>{getDayOfWeek(forecast.dt_txt)}</p>
            <img src={getWeatherIcon(forecast.weather[0].main)} alt="Weather Icon" className="weather-icon" />
            <p className='stays'>Temp: {forecast.main.temp}°C</p>
            <p className='pop'> Description: {forecast.weather[0].description}</p>
            <p className='pop'>Feels like : {forecast.main.feels_like}°C</p>
            <p className='pop'>Humidity : {forecast.main.humidity}%</p>
            <p className='pop'>Pressure : {forecast.main.pressure}</p>
            <p className='pop'>Wind Speed : {forecast.wind.speed}m/s</p>
            <button id='more-info-btn'>More Info</button> 
          </div>
        ))}

    </div>
  );
};

export default WeatherForecast;
