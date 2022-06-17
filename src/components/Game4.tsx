import React, { useEffect, useState } from 'react';
import { handleRemainingLevels, shuffleArray } from '../helpers/helpFunctions';

const Game4 = (props: { setGameName: (arg: ((str: string) => string) | string) => void, changeGame: (arg: ((bol: boolean) => boolean) | boolean) => void, setRemainingLevels: (func: ((num: number) => number) | number) => void }) => {

  const { setGameName, changeGame, setRemainingLevels }= props;

  const [numbersArray, setNumbersArray] = useState([[0]]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [totalNumbers, setTotalNumbers] = useState(0);
  const [classArray, setClassArray] = useState([['']]);
  const [shuffleAll, setshuffleAll] = useState(false);

  // General game useEffect
  useEffect(() => {
    setGameName('Ascending numbers');
    setRemainingLevels(1);
    return () => {
      setGameName('');
      setRemainingLevels(0);
    }
  }, []);

  const generateNumbersArray= (userRows: number, userSmallRow: number): number[][] => {
    let rows: number;
    if(userRows<1) rows= 1;
    else rows= userRows;

    let smallRow: number;
    if(userSmallRow<1) smallRow= 1;
    else smallRow= userSmallRow;

    const plainNumArray= [];
    const numArray: number[][]= [];
    const numberCount= (smallRow * (Math.floor(rows / 2) + Math.floor(rows % 2))) + ((smallRow + 1) * (Math.floor(rows / 2)));
    for(let i=0; i<numberCount; i++){
      plainNumArray.push(i+1);
    }
    shuffleArray(plainNumArray);
    let rowCount= -1;
    const leftNumbers: number[]= [];
    for(let j=0; j<rows; j++){
      if(j === 0){
        leftNumbers.push(1);
      } else if(j%2){
        leftNumbers.push(leftNumbers.at(-1)! + smallRow);
      } else {
        leftNumbers.push(leftNumbers.at(-1)! + smallRow + 1);
      }
    }
    plainNumArray.forEach((numb, index) => {
      // if(index + 1 === 1 || index + 1 === 5 || index + 1 === 10 || index + 1 === 14 || index + 1 === 19 || index + 1 === 23 || index + 1 === 28){
      if(leftNumbers.includes(index + 1)){
        numArray.push([]);
        rowCount++;
      }
      numArray[rowCount].push(numb);
    });
    return numArray;
  };

  const generateClassArray= (numArr: number[][], className: string): string[][] => {
    const classArr: string[][]= [];
    for(let row in numArr){
      classArr.push([]);
      for(let el in numArr[row]){
       // Logic to generate the classes array to fix the shit made on line 86
       classArr[row].push(className);
      };
    };
    return classArr;
  };

  useEffect(() => {
    const userRows= 5;
    const userSmallRow= 4;
    const numArr= generateNumbersArray(userRows, userSmallRow);
    setNumbersArray(numArr);
    setClassArray(generateClassArray(numArr, 'game-four__row__element'));
    setTotalNumbers((userRows * userSmallRow) + Math.floor(userRows / 2));
  }, [shuffleAll]);

  const handleClick= (e: React.MouseEvent<HTMLElement>) => {
    const splittedId= e.currentTarget.id.split('-');
    if(currentNumber === +splittedId[0]){
      if(currentNumber === totalNumbers) {
        setRemainingLevels(old => handleRemainingLevels(old, changeGame));
        setshuffleAll(old => !old);
        setCurrentNumber(1);
      }
      else{
        setCurrentNumber(old => old + 1);
        const tempClassArr= [...classArray];
        tempClassArr[+splittedId[1]][+splittedId[2]]= 'game-four__row__element game-four__row__element--clicked'
        // e.currentTarget.className += ' game-four__row__element--clicked';
      }
    }
  }

  return (
    <div className='game-four'>
      {
        numbersArray.map((row, rowIndex) => <div key={`row-${rowIndex}`} className='game-four__row'>{
          row.map((element, elementIndex) => <div onClick={handleClick} id={`${element}-${rowIndex}-${elementIndex}`} key={`row-${rowIndex}-element-${elementIndex}`} className={classArray[rowIndex][elementIndex]}>{element}</div>)
        }</div>)
      }
    </div>
  )
};

export default Game4;