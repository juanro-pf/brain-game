import React, { useEffect, useRef, useState } from 'react';
import colors from '../media/colors.json';
import { getRandomElement, handleRemainingLevels, shuffleArray } from '../helpers/helpFunctions';

const Game10 = (props: { setGameName: (arg: ((str: string) => string) | string) => void, changeGame: (arg: ((bol: boolean) => boolean) | boolean) => void, setRemainingLevels: (func: ((num: number) => number) | number) => void }) => {

  const { setGameName, changeGame, setRemainingLevels }= props;

  // General game useEffect
  useEffect(() => {
    setGameName('Pick the side');
    setRemainingLevels(0);
    return () => {
      setGameName('');
    }
  }, []);

  const sides= {
    'ArrowLeft': [0, 2],
    'ArrowRight': [1, 3]
  };

  type Color = keyof typeof colors;
  type Side = keyof typeof sides;

  // Below 2 functions was created because the listeners do not have access to the state https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
  const setCurrentColorRef = (count: number): void => {
    setCurrentColor(count);
    currentColorRef.current= count;
  };

  const setCansArrayRef = (arr: string[]): void => {
    setCansArray(arr);
    cansArrayRef.current= arr;
  };

  const handleKey= (e: KeyboardEvent) => {
    if(colorsArray[currentColorRef.current] && sides[e.key as Side] && sides[e.key as Side].includes(cansArrayRef.current.indexOf(colorsArray[currentColorRef.current]))){
      if(currentColorRef.current === colorsArray.length - 1) setRemainingLevels(old => handleRemainingLevels(old, changeGame));
      if(currentColorRef.current !== 0 && currentColorRef.current !== colorsArray.length && currentColorRef.current % 9 === 0){
        const newCans= [...cansArray];
        shuffleArray(newCans);
        setCansArrayRef(newCans);
      }
      setCurrentColorRef(currentColorRef.current + 1);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey);
    }
  }, []);
  
  const generateColorsArray= (colorsCount: number): string[] => {
    const array: string[]= [];
    for(let i=0; i<colorsCount; i++){
      array.push(getRandomElement(Object.keys(colors)));
    }
    return array;
  };

  const [colorsArray, setColorsArray] = useState(generateColorsArray(50));
  const [currentColor, setCurrentColor] = useState(0); //currentColorIndex would be a better name
  const currentColorRef = useRef(currentColor);
  const [cansArray, setCansArray] = useState(Object.keys(colors));
  const cansArrayRef = useRef(cansArray);

  return (
    <div className='game-ten'>
      <div className='game-ten__item' style={{ backgroundColor: colorsArray[currentColor + 2] ? colors[colorsArray[currentColor + 2] as Color] : '', border: colorsArray[currentColor + 2] ? '' : '2px solid transparent' }}>{currentColor + 2 !== 0 && currentColor + 2 !== colorsArray.length && (currentColor + 2) % 9 === 0 && '?'}</div>
      <div className='game-ten__item' style={{ backgroundColor: colorsArray[currentColor + 1] ? colors[colorsArray[currentColor + 1] as Color] : '', border: colorsArray[currentColor + 1] ? '' : '2px solid transparent' }}>{currentColor + 1 !== 0 && currentColor + 1 !== colorsArray.length && (currentColor + 1) % 9 === 0 && '?'}</div>
      <div className='game-ten__item' style={{ backgroundColor: colorsArray[currentColor] ? colors[colorsArray[currentColor] as Color] : '', border: colorsArray[currentColor] ? '' : '2px solid transparent' }}>{currentColor !== 0 && currentColor !== colorsArray.length && currentColor % 9 === 0 && '?'}</div>
      <div className='game-ten__section-down'>
        <div className='game-ten__section-down__side'>
          <div className='game-ten__section-down__side__item' style={{ backgroundColor: colors[cansArray[2] as Color] }}></div>
          <div className='game-ten__section-down__side__item' style={{ backgroundColor: colors[cansArray[0] as Color] }}></div>
        </div>
        <div className='game-ten__section-down__side'>
          <div className='game-ten__section-down__side__item' style={{ backgroundColor: colors[cansArray[3] as Color] }}></div>
          <div className='game-ten__section-down__side__item' style={{ backgroundColor: colors[cansArray[1] as Color] }}></div>
        </div>
      </div>
    </div>
  )
};

export default Game10;