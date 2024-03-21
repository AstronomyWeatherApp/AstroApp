import React, { useState, useEffect } from 'react';

const PlanetTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.astronomyapi.com/api/v2/bodies/positions?longitude=-84.39733&latitude=33.775867&elevation=1&from_date=2024-03-21&to_date=2024-03-21&time=13%3A46%3A03", {
          method: 'GET',
          headers: {
            'Authorization': 'Basic MTFjYTcwODktNzUyNi00NmVkLWJhNWYtM2U5MTU3YWNmYTA1OmVhYjQ1ZDk1YzNkNWYyMzlhZmE3YzY5ZmMyMGVjNjU2YmU0YWM2ZTUzMzJhODI0YTVhODEzM2Q4NjIxOTU5OTE0ODc2OTk0NDlkNzAxY2JiNzNiMTM5ZDMyNTc3MzQ2MzVmM2Q1OWYwZWE2ZDM0MmUzMWVlYTZjZDBkZGM0YTdiNzljYWY1NWZjNDMxMDZlYzZiZmM2OWNjN2MyZDcxYjRkYjBmNjg4NTc2NjBjYTgxN2E4ZThjZDNkOTYyOGUwYzc4ZWZjNzVkZjgwYjliODY1NTQ1ODQ3ZWQyNmVmZmM0'
          },

        });
        const data = await response.json();
        console.log(data);
        setTableData(data.data.table.rows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <h2>Table</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Object</th>
            <th>Distance (AU)</th>
            <th>Altitude (Degrees)</th>
            <th>Azimuth (Degrees)</th>
            <th>Picture</th> {/* New column for pictures */}
          </tr>
        </thead>
        <tbody>
        {tableData.map((rowData, index) => (
      <tr key={index}>
        <td>{rowData.cells[0].date}</td>
        <td>{rowData.cells[0].name}</td>
        <td>{rowData.cells[0].distance.fromEarth.au}</td>
        <td>{rowData.cells[0].position.horizontal.altitude.degrees}</td>
        <td>{rowData.cells[0].position.horizontal.azimuth.degrees}</td>
        <td>
          {rowData.cells[0].name === 'Sun' && (
            <img src="https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2022/03/the_sun_in_high_resolution/24010613-1-eng-GB/The_Sun_in_high_resolution_pillars.jpg" alt="Sun" width="100" />
          )}
          {rowData.cells[0].name === 'Moon' && (
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/1200px-FullMoon2010.jpg" alt="Jupiter" width="100" />
          )}
          {rowData.cells[0].name === 'Mercury' && (
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/290px-Mercury_in_true_color.jpg" alt="Mercury" width="100" />
          )}
          {rowData.cells[0].name === 'Venus' && (
            <img src="https://science.nasa.gov/wp-content/uploads/2023/09/Venus.jpg?w=4096&format=jpeg" alt="Venus" width="100" />
          )}
          {rowData.cells[0].name === 'Earth' && (
            <img src="https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2022/04/earth/24035530-2-eng-GB/Earth_pillars.jpg" alt="Earth" width="100" />
          )}
          {rowData.cells[0].name === 'Mars' && (
            <img src="https://www.airedalesprings.co.uk/wp-content/uploads/2016/08/mars-iStock_000026519382_Large-1024x766.jpg" alt="Mars" width="100" />
          )}
          {rowData.cells[0].name === 'Jupiter' && (
            <img src="https://cdn.mos.cms.futurecdn.net/Mza6ccKYF6WVrqZekTtJxN-1200-80.jpg" alt="Jupiter" width="100" />
          )}
          {rowData.cells[0].name === 'Saturn' && (
            <img src="https://planetfacts.org/wp-content/uploads/2023/12/planet_saturn.jpg" alt="Saturn" width="100" />
          )}
          {rowData.cells[0].name === 'Uranus' && (
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Uranus_Voyager2_color_calibrated.png" alt="Uranus" width="100" />
          )}
          {rowData.cells[0].name === 'Neptune' && (
            <img src="https://images.squarespace-cdn.com/content/v1/5fa5ec79661ee904d2973ca0/1678752888290-2A53B1ST09WTKNPYW35R/neptune.png" alt="Pluto" width="100" />
          )}
          {rowData.cells[0].name === 'Pluto' && (
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_High-Res.jpg" alt="Pluto" width="100" />
          )}
          {/* Add more conditions for other objects as needed */}
        </td>
      </tr>
    ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanetTable;