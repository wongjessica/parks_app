import React from 'react';
import logo from './logo.svg';
import './App.css';
import ParkAPI from './routes/ParkAPI.jsx';
import NavvBar from './NavvBar.jsx';
import './App.scss';


function App() {
  return (
    <div className="App">
        <div>
          <NavvBar />
        </div>

        <div>
          <ParkAPI />
        </div>
    </div>
  );
}

export default App;
