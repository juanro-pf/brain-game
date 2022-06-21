import React, { useEffect, useState } from 'react';
import { handleRemainingLevels } from '../helpers/helpFunctions';

const Game7 = (props: { setPenalizationPoints: (func: ((num: number) => number) | number) => void, setGameName: (arg: ((str: string) => string) | string) => void, changeGame: (arg: ((bol: boolean) => boolean) | boolean) => void, setRemainingLevels: (func: ((num: number) => number) | number) => void }) => {

  const { setGameName, changeGame, setRemainingLevels, setPenalizationPoints }= props;

  // General game useEffect
  useEffect(() => {
    setGameName('Percentage');
    setRemainingLevels(1);
    return () => {
      setGameName('');
      setRemainingLevels(0);
    }
  }, []);

  const generatePercentage= (): [number, number, number] => {
    const percentageMultiple= 5;
    const possiblePercentagesCount= (100 / percentageMultiple) - 1;
    const percentage= percentageMultiple * (Math.floor(Math.random() * (possiblePercentagesCount)) + 1);
    const maxNumber= 1000;
    const totalMultiple= 10;
    const possibleTotalCount= (maxNumber / totalMultiple) - Math.floor(100 / totalMultiple);
    let total= totalMultiple * (Math.floor(Math.random() * possibleTotalCount) + Math.floor(100 / totalMultiple));
    let result= Math.floor(total * percentage / 100);
    // Following while is to avoid decimals
    while((result * 100) % percentage !== 0){
      result++;
    }
    total= (result * 100) / percentage;
    // console.log([percentage, total, result]);
    return [percentage, total, result];
  }

  const [percentage, setPercentage] = useState([50, 750, 375]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setPercentage(generatePercentage());
  }, []);
  

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if(inputValue === percentage[2].toString()) {
      setRemainingLevels(old => handleRemainingLevels(old, changeGame));
      setPercentage(generatePercentage());
    } else setPenalizationPoints(old => old + 10);
    setInputValue('');
  };

  return (
    <div className='game-seven'>
      <div className='game-seven__section-up'>
        <p><b>{percentage[0]}% of {percentage[1]}</b></p>
      </div>
      <div className='game-seven__section-down'>
        <form onSubmit={handleSubmit}>
          <input onChange={handleInputChange} value={inputValue} autoFocus />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
};

export default Game7;