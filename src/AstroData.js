
import React, { useState } from 'react';
import AstroApi from './AstroApi';
import MyComponent from './planetPos.js';
import PlanetTable from './planetTable.js';
import Weather from './Weather';
import Weather2  from './astroTable.js';

const AstroData = () => {
  const [city, setCity] = useState('');

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };


  return (
    <div>
      <h1>AstroData Page</h1>
      
     
      <Weather2 onCityChange={handleCityChange} />

    </div>
  );
};

export default AstroData;
