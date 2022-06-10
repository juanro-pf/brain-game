import React, { useState } from 'react';

const Game7 = () => {

  const generatePercentage= (): [number, number, number] => {
    const percentageMultiple= 5;
    const possiblePercentagesCount= (100 / percentageMultiple) - 1;
    const percentage= percentageMultiple * (Math.floor(Math.random() * (possiblePercentagesCount)) + 1);
    const maxNumber= 1000;
    const totalMultiple= 10;
    const possibleTotalCount= (maxNumber / totalMultiple);
    const total= totalMultiple * (Math.floor(Math.random() * possibleTotalCount) + 1);
    const result= total * percentage / 100;
    console.log([percentage, total, result]); //[65, 750, 487.5] Fix logic to avoid decimals
    //Also check possible rendering issue after saving changes on this component (might be due to using this function on useState declaration directly instead of useEffect)
    return [percentage, total, result];
  }

  const [percentage, setPercentage] = useState(generatePercentage());
  const [remainingLevels, setRemainingLevels] = useState(5);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if(inputValue === percentage[2].toString()) setRemainingLevels(old => old - 1);
    setPercentage(generatePercentage());
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