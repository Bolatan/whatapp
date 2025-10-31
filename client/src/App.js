import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="container" style={{
        backgroundColor: '#f0f2f5',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: '#075e54',
          color: 'white',
          padding: '10px 0',
          textAlign: 'center'
        }}>
          <h1>WhatsApp Clone - Lagos Theme</h1>
        </div>
        <br />
        <Routes>
          <Route path="/" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
