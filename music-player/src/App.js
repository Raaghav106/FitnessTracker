import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FilterComponent from './pages/filterPage';
import MusicPlayerComponent from './pages/playMusic';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FilterComponent />} />
        <Route path="/songs" element={<MusicPlayerComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
