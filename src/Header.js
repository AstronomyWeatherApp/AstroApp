// Header.js
import './Header.css';
import React, { useState } from 'react';
function Header(){

  const [searchInput, setSearchInput] = useState('');


  const handleSearch = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    // Do something with the searchInput value, for example, store it in a variable or call a function with it
    console.log('Search query:', searchInput);
    const city = searchInput
    console.log(city)
    
  };

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

return (
  <header className="header">
    <div className="header-left">
      <div className="hamburger-menu">
        {/* Hamburger menu icon */}
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
    <div className="header-right">
        {/* Form with search bar */}
        <form onSubmit={handleSearch}>
          <input
            className="search-bar"
            type="text"
            placeholder="   Enter a city name"
            value={searchInput}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
  </header>
);
};

export default Header