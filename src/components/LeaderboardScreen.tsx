import React, { useState } from 'react';
import LeaderboardTable from './LeaderboardTable';

const LeaderboardScreen = () => {

  const currentHighScores= localStorage.getItem('high-scores');
  const currentHighScoresArray: [string, number][]= currentHighScores ? JSON.parse(currentHighScores) : [];
  const [highScoresArray] = useState(currentHighScoresArray);

  return (
    <div style={{ paddingTop: '30px' }}>
      <LeaderboardTable highScores={highScoresArray} />
    </div>
  )
};

export default LeaderboardScreen;