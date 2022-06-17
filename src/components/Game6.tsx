import React, { useEffect, useState } from 'react';
import { shuffleArray, handleRemainingLevels } from '../helpers/helpFunctions';

const Game6 = (props: { setGameName: (arg: ((str: string) => string) | string) => void, changeGame: (arg: ((bol: boolean) => boolean) | boolean) => void, setRemainingLevels: (func: ((num: number) => number) | number) => void }) => {

  const { setGameName, changeGame, setRemainingLevels }= props;

  // General game useEffect
  useEffect(() => {
    setGameName('Missing number');
    setRemainingLevels(2);
    return () => {
      setGameName('');
      setRemainingLevels(0);
    }
  }, []);

  const generateArraySubset= (arr: number[], lenght: number): number[] => {
    const subArray: number[]= [];
    let i=0;
    while(i<lenght){
      const randElement= arr[Math.floor(Math.random() * arr.length)];
      if(!subArray.includes(randElement)){
        subArray.push(randElement);
        i++;
      }
    }
    return subArray;
  };

  const generateNumbersArray= (columns: number, elementsPerColumn: number): [number[][], number, number[]] => {
    const columnsArray: number[][]= [];
    const numbersArray= [];
    for(let i= 0; i<=columns*elementsPerColumn; i++){
      numbersArray.push(i+1);
    }
    const missingNumber= numbersArray.splice(Math.floor(Math.random() * numbersArray.length), 1)[0];
    shuffleArray(numbersArray);
    const responseArray= generateArraySubset(numbersArray, 4);
    responseArray.push(missingNumber);
    shuffleArray(responseArray);
    for(let i=0; i<columns; i++){
      columnsArray.push([]);
      for(let j=0;  j<elementsPerColumn; j++){
        columnsArray[i].push(numbersArray.pop()!);
      }
    }
    return [columnsArray, missingNumber, responseArray];
  };

  const [numbersArray, setNumbersArray] = useState([[0]]);
  const [missingNumber, setMissingNumber] = useState(0);
  const [responsesArray, setResponsesArray] = useState([0]);
  const [suffleAll, setSuffleAll] = useState(false);

  useEffect(() => {
    const generatedArray= generateNumbersArray(6,6);
    setNumbersArray(generatedArray[0]);
    setMissingNumber(generatedArray[1]);
    setResponsesArray(generatedArray[2]);
    // console.log(generatedArray[2]);
    // console.log(generatedArray[1]);
  }, [suffleAll]);
  
  const handleClick= (e: React.MouseEvent<HTMLElement>): void => {
    if(e.currentTarget.id === missingNumber.toString()) {
      setRemainingLevels(old => handleRemainingLevels(old, changeGame));
    }
    setSuffleAll(old => !old);
  };

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
        {
          responsesArray.map((element, index) => <div onClick={handleClick} id={`${element}`} key={`response-${index}`} className='game-six__section__responses'>{element}</div>)
        }
      </div>
    </div>
  )
};

export default Game6;