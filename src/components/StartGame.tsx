import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const StartGame = (props: { changeGame: (arg: ((bol: boolean) => boolean) | boolean) => void, startGame: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const { changeGame, startGame }= props;

  useEffect(() => {
    return () => {
      startGame(true);
    }
  }, []);  

  const handleClick= () => {
    changeGame(old => !old);
  };

  return (
    <div className='start-game'>
      <p>If you already know the <Link to="/instructions" >instructions</Link>, then you are ready to play!</p>
      <button onClick={handleClick}>Play now</button>
    </div>
  )
};

export default StartGame;