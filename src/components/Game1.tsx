import React, { useEffect, useState } from 'react';
import { getRandomElement, handleRemainingLevels, shuffleArray } from '../helpers/helpFunctions';
import newColors from '../media/colors.json';

const Game1 = (props: { setGameName: (arg: ((str: string) => string) | string) => void, changeGame: (arg: ((bol: boolean) => boolean) | boolean) => void, setRemainingLevels: (func: ((num: number) => number) | number) => void, height: number, text: string, setText: Function, textColor: string, setTextColor: Function }) => {

  const colorsPlusBlack= {...newColors, "Black": "Black"};
  type Color = keyof typeof newColors;
  type ColorPlusBlack = keyof typeof colorsPlusBlack;

  const { setGameName, changeGame, setRemainingLevels, height, text, setText, textColor, setTextColor }= props;
  const cuadrantHeight= (height -58 -38 )/2; //38 from .navbar and 58 from .top-bar

  const colors= Object.keys(newColors); //['Yellow', 'Green', 'Red', 'Blue']
  const colorsPlusBlackArray= Object.keys(colorsPlusBlack);

  // General game useEffect
  useEffect(() => {
    setGameName('Pick the color');
    setRemainingLevels(14);
    return () => {
      setGameName('');
      setRemainingLevels(0);
      setText('');
      setTextColor('Black');
    }
  }, []);

  useEffect(() => {
    setText(getRandomElement(colors));
    setTextColor(colorsPlusBlack[getRandomElement(colorsPlusBlackArray) as ColorPlusBlack]);
  }, []);

  const [shuffledColors, setShuffledColors] = useState(colors);

  const shuffleColors= (colorArray: string[]): void => {
    const copyArray= [...colorArray];
    shuffleArray(copyArray);
    setShuffledColors(copyArray);
    setText(getRandomElement(colors));
    setTextColor(colorsPlusBlack[getRandomElement(colorsPlusBlackArray) as Color]);
  };

  const handleScore= (e: React.MouseEvent<HTMLElement>): void => {
    if(textColor !== 'Black' && e.currentTarget.id === text) {
      setRemainingLevels(old => handleRemainingLevels(old, changeGame));
    }
    else if(textColor === 'Black' && e.currentTarget.id !== text) setRemainingLevels(old => handleRemainingLevels(old, changeGame));
  };
  
  return (
    <div className='game-one'>
      <div className='game-one__cuadrant' id={ shuffledColors[0] } style={{ backgroundColor: newColors[shuffledColors[0] as Color], height: `${cuadrantHeight}px` }}
        onClick={(event) => {
          handleScore(event)
          shuffleColors(colors)
        }}
        >
        </div>
      <div className='game-one__cuadrant' id={ shuffledColors[1] } style={{ backgroundColor: newColors[shuffledColors[1] as Color], height: `${cuadrantHeight}px` }}
        onClick={(event) => {
          handleScore(event)
          shuffleColors(colors)
        }}
        >
        </div>
      <div className='game-one__cuadrant' id={ shuffledColors[2] } style={{ backgroundColor: newColors[shuffledColors[2] as Color], height: `${cuadrantHeight}px` }}
        onClick={(event) => {
          handleScore(event)
          shuffleColors(colors)
        }}
        >
        </div>
      <div className='game-one__cuadrant' id={ shuffledColors[3] } style={{ backgroundColor: newColors[shuffledColors[3] as Color], height: `${cuadrantHeight}px` }}
        onClick={(event) => {
          handleScore(event)
          shuffleColors(colors)
        }}
        >
        </div>
    </div>
  )
};

export default Game1;