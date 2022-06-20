import React, { useEffect, useRef, useState } from 'react';
import Game1 from './Game1';
import Game2 from './Game2';
import Game3 from './Game3';
import Game4 from './Game4';
import Game5 from './Game5';
import Game6 from './Game6';
import Game7 from './Game7';
import Game8 from './Game8';
import Game9 from './Game9';
import Game10 from './Game10';
import Score from './Score';
import { shuffleArray } from '../helpers/helpFunctions';
import StartGame from './StartGame';

const GameScreen = () => {

  const height= window.innerHeight;

  const [midText, setMidText] = useState('');
  const [midTextColor, setMidTextColor] = useState('Black');
  const [games, setGames] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0]);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [changeGame, setChangeGame] = useState(false);
  const [currentGameName, setCurrentGameName] = useState('');
  const [remainingLevels, setRemainingLevels] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const tempRefValue: any= 0;
  const timerRef = useRef(tempRefValue);

  //Increase a state counter instead of console.log
  useEffect(() => {
    if(timerRunning) timerRef.current= setInterval(() => console.log('va'));
  }, [timerRunning]);

  useEffect(() => {
    const tempArray= [...games];
    if(tempArray.length === 10) shuffleArray(tempArray);
    if(tempArray.length !== 0) setCurrentScreen(tempArray.pop()!);
    else {
      clearInterval(timerRef.current);
      setCurrentScreen(11);
    }
    setGames(tempArray);
  }, [changeGame]);

  return (
    <div>
      <div className='top-bar'>
        <div className='top-bar__section top-bar__section--left'>
          <span>Remaining games: <span style={{ color: 'red' }}>{games.length}</span></span>
          <p>Time: <b>0:00</b></p>
        </div>
        <p className='top-bar__section top-bar__section--middle' style={{ color: midTextColor }} >{midText}</p>
        <div className='top-bar__section top-bar__section--right'>
          {
            currentScreen !== 0 && currentScreen !== 11 &&
            [<span key='1span'>Remaining levels: <span key='2span' style={{ color: 'red' }}>{remainingLevels}</span></span>,
            <p key='1p' ><b>{currentGameName}</b></p>]
          }
        </div>
      </div>
      {/* <div onClick={() => setChangeGame(old => !old)} className='game-section' style={{ height: `${height - 58 - 38}px` }}> 38 from .navbar and 58 from .top-bar */}
      <div className='game-section' style={{ height: `${height - 58 - 38}px` }}> {/*38 from .navbar and 58 from .top-bar*/}
        {
          [
            <StartGame changeGame={setChangeGame} startGame={setTimerRunning} />,
            <Game1 setGameName={setCurrentGameName} changeGame={setChangeGame} setRemainingLevels={setRemainingLevels} height={height} text={midText} setText={setMidText} textColor={midTextColor} setTextColor={setMidTextColor} />,
            <Game2 setGameName={setCurrentGameName} changeGame={setChangeGame} setRemainingLevels={setRemainingLevels} />,
            <Game3 setGameName={setCurrentGameName} changeGame={setChangeGame} setRemainingLevels={setRemainingLevels} setText={setMidText} setTextColor={setMidTextColor}/>,
            <Game4 setGameName={setCurrentGameName} changeGame={setChangeGame} setRemainingLevels={setRemainingLevels} />,
            <Game5 setGameName={setCurrentGameName} changeGame={setChangeGame} setRemainingLevels={setRemainingLevels} />,
            <Game6 setGameName={setCurrentGameName} changeGame={setChangeGame} setRemainingLevels={setRemainingLevels} />,
            <Game7 setGameName={setCurrentGameName} changeGame={setChangeGame} setRemainingLevels={setRemainingLevels} />,
            <Game8 setGameName={setCurrentGameName} changeGame={setChangeGame} setRemainingLevels={setRemainingLevels} />,
            <Game9 setGameName={setCurrentGameName} changeGame={setChangeGame} setRemainingLevels={setRemainingLevels} />,
            <Game10 setGameName={setCurrentGameName} changeGame={setChangeGame} setRemainingLevels={setRemainingLevels} />,
            <Score />
          ][currentScreen]
        }
      </div>
    </div>
  )
};

export default GameScreen;