import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

/* First defines a functional component ParkAPI with const arrays parks, setParks
then creates a function to count all the parks by its category using the reduce method. Note: acc = accumulation
*/
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

  /* Fetching API Data inside a component using a useEffect() hook. 
  Makes a fetch request to the National Parks API.
  setParks is called with the data.data property, which sets it to the array of parks.
  Then if there are any errors, the 'catch' statement logs the error
  */
  useEffect(() => {
    fetch('https://developer.nps.gov/api/v1/activities/parks?api_key=q3rOnLMk9ojhMdKRdF8nQeR1UsREJwdHMRgv05Ws')
      .then(res => res.json())
      .then(data => setParks(data.data))
      .catch(error => console.log(error));
  }, []);

/* Displaying the API data using JavaScript XML. 
We first render the park counts by category.
And then we display the rest of the park data using the map function to iterate over the parks array.

*/

  return (
    <div>

      <h1>Parks</h1>

      <ul>
      <h2>Park Counts by Category:</h2>

        {parks.map(park => (
          <li key={park.id}>

            {Object.entries(parkCountsByCategory).map(([category, count]) => (
            <ListGroup>
                <li key={category}>
                <ListGroup.Item><b>{category}</b>: {count}</ListGroup.Item>
                </li>
            </ListGroup>
            ))}

            <br></br>

            <ul>
              {park.parks.map(p => (
                <li key={p.parkCode}>
                  <h3>{p.fullName}</h3>
                  <p>States: {p.states}</p>
                  <p>Park Code: {p.parkCode}</p>
                  <p>Designation: {p.designation}</p>
                  <p>Website: <a href={p.url}>{p.url}</a></p>
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
