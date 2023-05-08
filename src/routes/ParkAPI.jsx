import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

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
    
      <br></br>  
      <h1>Parks Count by Category:</h1>
      <br></br>

      <ul>

        {parks.map(park => (
          <li key={park.id}>

            {Object.entries(parkCountsByCategory).map(([category, count]) => (
            <ListGroup>
                <li key={category}>
                <ListGroup.Item variant="success" style={{ maxWidth: "1450px" }}>
                    <b>{category}</b>: {count}
                </ListGroup.Item>
                </li>
            </ListGroup>
            ))}

            <br></br>

            <h2>All National Parks Info:</h2>    
            <br></br>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {park.parks.map(p => (
                <div key={p.parkCode}>
                <Card style={{ width: '20rem' }}>
                    <Card.Body>
                        <Card.Title><h3>{p.fullName}</h3></Card.Title>
                        <p>States: {p.states}</p>
                        <p>Park Code: {p.parkCode}</p>
                        <p>Designation: {p.designation}</p>
                        <p>Website: <a href={p.url}>{p.url}</a></p>
                    </Card.Body>
                </Card>
                </div>
              ))}
            </div>

          </li>
        ))}

      </ul>

    </div>
  );
}

export default ParkAPI;
