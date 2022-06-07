import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import GameScreen from './components/GameScreen';
import Instructions from './components/Instructions';
import Navbar from './components/Navbar';

const App = () => {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/game-mix" element={<GameScreen />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="*" element={<Navigate replace to="/game-mix" />} />
      </Routes>
    </div>
  )
};

export default App;
