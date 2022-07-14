import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome.js';
import InfoBasic from './components/InfoBasic.js';
import InfoExp from './components/InfoExp.js';
import Completion from './components/Completion.js';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/info-basic" element={<InfoBasic />} />
        <Route path="/info-exp" element={<InfoExp />} />
        <Route path="/completion" element={<Completion />} />
      </Routes>
    </div>
  );
}

export default App;
