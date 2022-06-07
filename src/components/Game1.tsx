import React, { useEffect, useState } from 'react';
import newColors from '../media/colors.json';

const Game1 = (props: { height: number, text: string, setText: Function, textColor: string, setTextColor: Function }) => {

  const colorsPlusBlack= {...newColors, "Black": "Black"};
  type Color = keyof typeof newColors;
  type ColorPlusBlack = keyof typeof colorsPlusBlack;

  const { height, text, setText, textColor, setTextColor }= props;
  const cuadrantHeight= (height -58 -38 )/2; //38 from .navbar and 58 from .top-bar

  const colors= Object.keys(newColors); //['Yellow', 'Green', 'Red', 'Blue']
  const colorsPlusBlackArray= Object.keys(colorsPlusBlack);

  const getRandomColor= (colorArray: string[]): string => {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  };

  useEffect(() => {
    setText(getRandomColor(colors));
    setTextColor(colorsPlusBlack[getRandomColor(colorsPlusBlackArray) as ColorPlusBlack]);
  }, []);
  

  const [shuffledColors, setShuffledColors] = useState(colors);
  // const [displayedText, setDisplayedText] = useState(getRandomColor(colors));
  // const [displayedColor, setDisplayedColor] = useState(getRandomColor([...colors, 'Black']));
  // const [score, setScore] = useState(0);

  const shuffleColors= (colorArray: string[]): void => {
    const copyArray= [...colorArray];
    let currentIndex = copyArray.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [copyArray[currentIndex], copyArray[randomIndex]] = [copyArray[randomIndex], copyArray[currentIndex]];
    }
    
    setShuffledColors(copyArray);
    // setDisplayedText(getRandomColor(colors));
    // setDisplayedColor(getRandomColor([...colors, 'Black']));
    setText(getRandomColor(colors));
    setTextColor(colorsPlusBlack[getRandomColor(colorsPlusBlackArray) as Color]);
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