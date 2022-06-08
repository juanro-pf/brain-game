import React, { useEffect, useState } from 'react';

const Game4 = () => {

  const [numbersArray, setNumbersArray] = useState([[0]]);
  const [currentNumber, setCurrentNumber] = useState(1);

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

    //Shuffle array
    let currentIndex = plainNumArray.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [plainNumArray[currentIndex], plainNumArray[randomIndex]] = [
        plainNumArray[randomIndex], plainNumArray[currentIndex]];
    }
    //Shuffle array ends

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

  useEffect(() => {
    setNumbersArray(generateNumbersArray(5, 4));
  }, []);

  const handleClick= (e: React.MouseEvent<HTMLElement>) => {
    if(currentNumber === +e.currentTarget.id){
      setCurrentNumber(old => old + 1);
      e.currentTarget.className += ' game-four__row__element--clicked';
    }
    console.log(e.currentTarget.className);
  }

  return (
    <div className='game-four'>
      {
        numbersArray.map((row, rowIndex) => <div key={`row-${rowIndex}`} className='game-four__row'>{
          row.map((element, elementIndex) => <div onClick={handleClick} id={`${element}`} key={`row-${rowIndex}-element-${elementIndex}`} className='game-four__row__element'>{element}</div>)
        }</div>)
      }
    </div>
  )
};

export default Game4;