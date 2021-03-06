import React, { useEffect, useState } from 'react';
import { handleRemainingLevels } from '../helpers/helpFunctions';

const Game2 = (props: { setPenalizationPoints: (func: ((num: number) => number) | number) => void, setGameName: (arg: ((str: string) => string) | string) => void, changeGame: (arg: ((bol: boolean) => boolean) | boolean) => void, setRemainingLevels: (func: ((num: number) => number) | number) => void }) => {

  const { setGameName, changeGame, setRemainingLevels, setPenalizationPoints }= props;

  const generateOperation = (): [string, string] => {
    switch (Math.floor(Math.random() * 3)) {
      case 0: //Sum
        const sumNumber1=  Math.floor(Math.random() * 500) + 1;
        const sumNumber2=  Math.floor(Math.random() * 500) + 1;
        return [`${sumNumber1} + ${sumNumber2}`, (sumNumber1 + sumNumber2).toString()];
      case 1: //Diference
        const diferenceNumber1=  Math.floor(Math.random() * 901) + 100;
        const diferenceNumber2=  Math.floor(Math.random() * diferenceNumber1) + 1;
        return [`${diferenceNumber1} - ${diferenceNumber2}`, (diferenceNumber1 - diferenceNumber2).toString()];
      case 2: //Multiplication
        const multiplicationNumber1=  Math.floor(Math.random() * 30) + 1;
        const multiplicationNumber2=  Math.floor(Math.random() * 30) + 1;
        return [`${multiplicationNumber1} x ${multiplicationNumber2}`, (multiplicationNumber1 * multiplicationNumber2).toString()];
      default:
        return ['23 x 25', '575'];
    }
  };

  const [operation, setOperation] = useState(['23 x 25', '575']);
  const [inputValue, setInputValue] = useState('');

  // General game useEffect
  useEffect(() => {
    setGameName('Basic math');
    setRemainingLevels(2);
    return () => {
      setGameName('');
      setRemainingLevels(0);
    }
  }, []);

  useEffect(() => {
    setOperation(generateOperation());
  }, []);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
  };
  
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if(inputValue === operation[1]) setRemainingLevels(old => handleRemainingLevels(old, changeGame));
    else setPenalizationPoints(old => old + 10);
    setOperation(generateOperation());
    setInputValue('');
  };

  return (
    <div className='game-two'>
      <div className='game-two__section-up'>
        <p><b>{operation[0]}</b></p>
      </div>
      <div className='game-two__section-down'>
        <form onSubmit={handleSubmit}>
          <input onChange={handleInputChange} value={inputValue} autoFocus />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
};

export default Game2;