import axios from 'axios';

import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = null;

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          setResponseData(this.responseText);
        }
      });

      xhr.open("GET", "https://api.astronomyapi.com/api/v2/bodies/positions?longitude=-84.39733&latitude=33.775867&elevation=1&from_date=2024-03-21&to_date=2024-03-21&time=13%3A46%3A03");
      xhr.setRequestHeader("Authorization", "Basic MTFjYTcwODktNzUyNi00NmVkLWJhNWYtM2U5MTU3YWNmYTA1OmVhYjQ1ZDk1YzNkNWYyMzlhZmE3YzY5ZmMyMGVjNjU2YmU0YWM2ZTUzMzJhODI0YTVhODEzM2Q4NjIxOTU5OTE0ODc2OTk0NDlkNzAxY2JiNzNiMTM5ZDMyNTc3MzQ2MzVmM2Q1OWYwZWE2ZDM0MmUzMWVlYTZjZDBkZGM0YTdiNzljYWY1NWZjNDMxMDZlYzZiZmM2OWNjN2MyZDcxYjRkYjBmNjg4NTc2NjBjYTgxN2E4ZThjZDNkOTYyOGUwYzc4ZWZjNzVkZjgwYjliODY1NTQ1ODQ3ZWQyNmVmZmM0");

      xhr.send(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {responseData && (
        <pre>{responseData}</pre>
      )}
    </div>
  );
};

export default MyComponent;
