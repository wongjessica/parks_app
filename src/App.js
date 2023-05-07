import React from 'react';
import logo from './logo.svg';
import './App.css';
import ParkAPI from './routes/ParkAPI.jsx';


function App() {
  return (
    <div className="App">
        <p>
          Parks App
        </p>
        
        <div>
          <ParkAPI />
        </div>
    </div>
  );
}

export default App;
