import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import GameScreen from './components/GameScreen';
import Instructions from './components/Instructions';
import LeaderboardScreen from './components/LeaderboardScreen';
import Navbar from './components/Navbar';

const App = () => {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/game-mix" element={<GameScreen />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
        <Route path="*" element={<Navigate replace to="/game-mix" />} />
      </Routes>
    </div>
  )
};

export default App;
