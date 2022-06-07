import React, { useState } from 'react';
import Game1 from './Game1';
import Game2 from './Game2';
import Game3 from './Game3';

const GameScreen = () => {

  // const width= window.innerWidth;
  const height= window.innerHeight;

  const [midText, setMidText] = useState('');
  const [midTextColor, setMidTextColor] = useState('Black');

  return (
    <div>
      <div className='top-bar'>
        <div className='top-bar__section top-bar__section--left'>
          <span>Remaining games: <span style={{ color: 'red' }}>5</span></span>
          <p>Time: <b>50:34</b></p>
        </div>
        <p className='top-bar__section top-bar__section--middle' style={{ color: midTextColor }} >{midText}</p>
        <div className='top-bar__section top-bar__section--right'>
          <span>Remaining levels: <span style={{ color: 'red' }}>5</span></span>
          <p><b>Pick the color</b></p>
        </div>
      </div>
      <div className='game-section' style={{ height: `${height - 58 - 38}px` }}> {/*38 from .navbar and 58 from .top-bar*/}
        {/* <Game1 height={height} text={midText} setText={setMidText} textColor={midTextColor} setTextColor={setMidTextColor} /> */}
        {/* <Game2 /> */}
        <Game3 setText={setMidText} setTextColor={setMidTextColor}/>
      </div>
    </div>
  )
};

export default GameScreen;