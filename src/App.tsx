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
        <Route path="/brain-game" element={<GameScreen />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
        <Route path="*" element={<Navigate replace to="/brain-game" />} />
      </Routes>
    </div>
  )
};

export default App;
