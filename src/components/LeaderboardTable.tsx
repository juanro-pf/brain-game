import React from 'react';
import { convertCentisecondsToMinutesSecondsCentiseconds } from '../helpers/helpFunctions';

const LeaderboardTable = (props: { highScores: [string, number][] }) => {

  const { highScores }= props;

  return (
    <table className='leaderboard'>
        <thead>
          <tr key='headers-tr'>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {
            highScores.map((user, index) => 
              <tr key={`user-tr-name:${user[0]}-time:${user[1]}-index:${index}`}>
                <td>{user[0]}</td>
                <td>{convertCentisecondsToMinutesSecondsCentiseconds(user[1], true)}</td>
              </tr>
            )
          }
        </tbody>
      </table>
  )
};

export default LeaderboardTable;