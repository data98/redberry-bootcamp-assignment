import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome.js';
import InfoBasic from './components/InfoBasic.js';
import InfoExp from './components/InfoExp.js';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/info-basic" element={<InfoBasic />} />
        <Route path="/info-exp" element={<InfoExp />} />
        {/* completion */}
      </Routes>
    </div>
  );
}

export default App;
