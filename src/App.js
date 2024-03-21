import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Weather from './Weather';
import WeatherForecast from './weatherForecast';
import Header from './Header';
import AstroData from './AstroData';

const App = () => {
  const [city, setCity] = useState('');

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  // Define a function to clear the city state
  const clearCity = () => {
    setCity('');
  };

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {/* Pass clearCity function to clear city state */}
                <Weather onCityChange={handleCityChange} clearCity={clearCity} />
                <WeatherForecast city={city} />
              </div>
            }
          />
          <Route path="/AstroData" element={<AstroData />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
