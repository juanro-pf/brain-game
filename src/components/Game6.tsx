import React, { useEffect, useState } from 'react';
import { shuffleArray } from '../helpers/helpFunctions';

const Game6 = () => {

  const generateArraySubset= (arr: number, lenght: number): number[] => {
    const subArray: number[]= [];
    if(subArray.includes(arr[Math.floor(Math.random() * arr.length)])) //Check this tomorrow
    return subArray;
  };

  const generateNumbersArray= (columns: number, elementsPerColumn: number): [number[][], number] => {
    const columnsArray: number[][]= [];
    const numbersArray= [];
    for(let i= 0; i<=columns*elementsPerColumn; i++){
      numbersArray.push(i+1);
    }
    const missingNumber= numbersArray.splice(Math.floor(Math.random() * numbersArray.length), 1)[0];
    shuffleArray(numbersArray);
    for(let i=0; i<columns; i++){
      columnsArray.push([]);
      for(let j=0;  j<elementsPerColumn; j++){
        columnsArray[i].push(numbersArray.pop()!);
      }
    }
    return [columnsArray, missingNumber];
  };

  const [numbersArray, setNumbersArray] = useState([[0]]);
  const [missingNumber, setMissingNumber] = useState(0);

  useEffect(() => {
    const generatedArray= generateNumbersArray(6,6);
    setNumbersArray(generatedArray[0]);
    setMissingNumber(generatedArray[1]);
  }, []);
  

  return (
    <div className='game-six'>
      <div className='game-six__section'>
        {
          numbersArray.map((column, columnIndex) => <div key={`column-${columnIndex}`} className='game-six__section__column'>
            {
              column.map((element, elementIndex) => <div key={`column-${columnIndex}-element-${elementIndex}`} className='game-six__section__column__element'>{element}</div>)
            }
          </div>)
        }
      </div>
      <div className='game-six__section'>
        Sale
      </div>
    </div>
  )
};

export default Game6;