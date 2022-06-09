import React, { useEffect, useState } from 'react';
import { getRandomElement, shuffleArray } from '../helpers/helpFunctions';
import newColors from '../media/colors.json';

const Game1 = (props: { height: number, text: string, setText: Function, textColor: string, setTextColor: Function }) => {

  const colorsPlusBlack= {...newColors, "Black": "Black"};
  type Color = keyof typeof newColors;
  type ColorPlusBlack = keyof typeof colorsPlusBlack;

  const { height, text, setText, textColor, setTextColor }= props;
  const cuadrantHeight= (height -58 -38 )/2; //38 from .navbar and 58 from .top-bar

  const colors= Object.keys(newColors); //['Yellow', 'Green', 'Red', 'Blue']
  const colorsPlusBlackArray= Object.keys(colorsPlusBlack);

  useEffect(() => {
    setText(getRandomElement(colors));
    setTextColor(colorsPlusBlack[getRandomElement(colorsPlusBlackArray) as ColorPlusBlack]);
  }, []);

  const [shuffledColors, setShuffledColors] = useState(colors);
  // const [displayedText, setDisplayedText] = useState(getRandomElement(colors));
  // const [displayedColor, setDisplayedColor] = useState(getRandomElement([...colors, 'Black']));
  // const [score, setScore] = useState(0);

  const shuffleColors= (colorArray: string[]): void => {
    const copyArray= [...colorArray];
    let currentIndex = copyArray.length, randomIndex;
    shuffleArray(copyArray);
    setShuffledColors(copyArray);
    // setDisplayedText(getRandomElement(colors));
    // setDisplayedColor(getRandomElement([...colors, 'Black']));
    setText(getRandomElement(colors));
    setTextColor(colorsPlusBlack[getRandomElement(colorsPlusBlackArray) as Color]);
  };

  // const handleScore= (e: React.SyntheticEvent): void => { // Maybe try with <HTMLInputElement>
  //   if(color !== 'Black' && e.currentTarget.id === text) setScore(oldScore => oldScore + 1);
  //   else if(color === 'Black' && e.currentTarget.id !== text) setScore(oldScore => oldScore + 1);
  //   console.log(score);
  // };
  
  return (
    <div className='game-one'>
      <div className='game-one__cuadrant' id={ shuffledColors[0] } style={{ backgroundColor: newColors[shuffledColors[0] as Color], height: `${cuadrantHeight}px` }}
        onClick={(event) => {
          // handleScore(event)
          shuffleColors(colors)
        }}
        >
        </div>
      <div className='game-one__cuadrant' id={ shuffledColors[1] } style={{ backgroundColor: newColors[shuffledColors[1] as Color], height: `${cuadrantHeight}px` }}
        onClick={(event) => {
          // handleScore(event)
          shuffleColors(colors)
        }}
        >
        </div>
      <div className='game-one__cuadrant' id={ shuffledColors[2] } style={{ backgroundColor: newColors[shuffledColors[2] as Color], height: `${cuadrantHeight}px` }}
        onClick={(event) => {
          // handleScore(event)
          shuffleColors(colors)
        }}
        >
        </div>
      <div className='game-one__cuadrant' id={ shuffledColors[3] } style={{ backgroundColor: newColors[shuffledColors[3] as Color], height: `${cuadrantHeight}px` }}
        onClick={(event) => {
          // handleScore(event)
          shuffleColors(colors)
        }}
        >
        </div>
    </div>
  )
};

export default Game1;