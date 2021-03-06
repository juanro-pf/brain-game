import React, { useEffect, useState } from 'react';
import { convertCentisecondsToMinutesSecondsCentiseconds } from '../helpers/helpFunctions';
import LeaderboardTable from './LeaderboardTable';

const Score = (props: { time: number }) => {

  const currentHighScores= localStorage.getItem('high-scores');
  const currentHighScoresArray: [string, number][]= currentHighScores ? JSON.parse(currentHighScores) : [];
  const [highScoresArray, setHighScoresArray] = useState(currentHighScoresArray);
  const [highScorePosition, setHighScorePosition] = useState(10); //If === 10, then it is not a high score

  useEffect(() => {
    if(highScoresArray.length === 0) setHighScorePosition(0);
    else {
      if(highScoresArray.length < 10) setHighScorePosition(highScoresArray.length);
      for(let el in highScoresArray){
        if(time < highScoresArray[el][1]) {
          setHighScorePosition(+el);
          break;
        }
      }
    }
  }, []);

  const { time }= props;
  const readableTime= convertCentisecondsToMinutesSecondsCentiseconds(time);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
  };
  
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if(inputValue){
      const tempArray= [...highScoresArray];
      tempArray.splice(highScorePosition, 0, [inputValue, time]);
      if(tempArray.length > 10) tempArray.length= 10;
      setHighScoresArray(tempArray);
      localStorage.setItem('high-scores', JSON.stringify(tempArray));
      setHighScorePosition(10);
    } else alert('Please enter a non empty name');
  };

  return (
    <div className='score'>
      <p key='time'>It took you <b style={{ color: 'rgb(217, 3, 3)' }}>{readableTime[0]}</b> minutes, <b style={{ color: 'rgb(217, 3, 3)' }}>{readableTime[1]}</b> seconds and <b style={{ color: 'rgb(217, 3, 3)' }}>{+readableTime[2] * 10}</b> milliseconds to complete the game.</p>
      {
        highScorePosition !== 10 &&
        [
          <p key='message'><b>CONGRATULATIONS!</b> You got the {highScorePosition + 1} best time, introduce your name in the field below and click on submit to add your time to the High Scores.</p>,
          <form key='form' onSubmit={handleSubmit}>
            <input onChange={handleInputChange} value={inputValue} autoFocus />
            <button className='score__button score__submit-button' type='submit'>Submit</button>
          </form>
        ]
      }
      <LeaderboardTable highScores={highScoresArray} />
      <button className='score__button score__play-again-button' onClick={() => window.location.reload()}>Play again?</button>
      <br />
    </div>
  )
};

export default Score;