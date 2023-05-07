import React, { useState, useEffect } from 'react';

function ParkAPI() {
  const [parks, setParks] = useState([]);

  const parkCountsByCategory = parks.reduce((acc, park) => {
    park.parks.forEach(p => {
      if (acc[park.name]) {
        acc[park.name]++;
      } else {
        acc[park.name] = 1;
      }
    });
    return acc;
  }, {});

  useEffect(() => {
    fetch('https://developer.nps.gov/api/v1/activities/parks?api_key=q3rOnLMk9ojhMdKRdF8nQeR1UsREJwdHMRgv05Ws')
      .then(res => res.json())
      .then(data => setParks(data.data))
      .catch(error => console.log(error));
  }, []);


  return (
    <div>

      <h1>Parks</h1>

      <ul>

        {parks.map(park => (
          <li key={park.id}>

            {Object.entries(parkCountsByCategory).map(([category, count]) => (
            <li key={category}>
                {category}: {count}
            </li>
            ))}

            <ul>
              {park.parks.map(p => (
                <li key={p.parkCode}>
                  <h3>{p.fullName}</h3>
                  <p>States: {p.states}</p>
                  <p>Park Code: {p.parkCode}</p>
                  <p>Designation: {p.designation}</p>
                  <p>URL: <a href={p.url}>{p.url}</a></p>
                </li>
              ))}
            </ul>

          </li>
        ))}

      </ul>

    </div>
  );
}

export default ParkAPI;
