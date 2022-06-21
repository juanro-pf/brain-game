import React, { useEffect, useState } from 'react';
import { handleRemainingLevels } from '../helpers/helpFunctions';

const Game8 = (props: { setPenalizationPoints: (func: ((num: number) => number) | number) => void, setGameName: (arg: ((str: string) => string) | string) => void, changeGame: (arg: ((bol: boolean) => boolean) | boolean) => void, setRemainingLevels: (func: ((num: number) => number) | number) => void }) => {

  const { setGameName, changeGame, setRemainingLevels, setPenalizationPoints }= props;

  // General game useEffect
  useEffect(() => {
    setGameName('Fractions');
    setRemainingLevels(1);
    return () => {
      setGameName('');
      setRemainingLevels(0);
    }
  }, []);

  const generateFraction= (): [number, number, number, number] => {
    const denominator= Math.floor(Math.random() * 8) + 2;
    let numerator= Math.floor(Math.random() * 9) + 1;
    while(denominator === numerator) numerator= Math.floor(Math.random() * 9) + 1;
    let total: number;
    let result: number;
    if(numerator < denominator) { //<1
      total= Math.floor(Math.random() * 900) + 100;
      while(total % denominator !== 0) total--;
      result= total * (numerator / denominator);
    } else { //>1
      result= Math.floor(Math.random() * 990) + 10;
      while(result % numerator !== 0) result--;
      total= result * (denominator / numerator);
    }
    // console.log([numerator, denominator, total, result]);
    return [numerator, denominator, total, result];
  }

  const [fraction, setFraction] = useState([3, 4, 100, 75]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setFraction(generateFraction());
  }, []);
  

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if(inputValue === fraction[3].toString()) {
      setRemainingLevels(old => handleRemainingLevels(old, changeGame));
      setFraction(generateFraction());
    } else setPenalizationPoints(old => old + 10);
    setInputValue('');
  };

  return (
    <div className='game-eight'>
      <div className='game-eight__section-up'>
        <p><b>{fraction[0]}/{fraction[1]} of {fraction[2]}</b></p>
      </div>
      <div className='game-eight__section-down'>
        <form onSubmit={handleSubmit}>
          <input onChange={handleInputChange} value={inputValue} autoFocus />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
};

export default Game8;