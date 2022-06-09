import React, { useEffect, useState } from 'react';
import { getRandomElement } from '../helpers/helpFunctions';
import newColors from '../media/colors.json';

const Game3 = (props: { setText: Function, setTextColor: Function }) => {
  
  type Color = keyof typeof newColors;

  const { setText, setTextColor }= props;

  const colors= Object.keys(newColors); //['Yellow', 'Green', 'Red', 'Blue']

  const [selectedColorCount, setSelectedColorCount] = useState(0);
  const [cellsArray, setCellsArray] = useState([['']]);
  const [optionsArray, setOptionsArray] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const randColor= getRandomElement(colors);
    setText(randColor);
    setTextColor(newColors[randColor as Color]);  // https://bobbyhadz.com/blog/typescript-element-implicitly-has-any-type-expression
    const [generatedCells, count]= generateCellsArray(randColor);
    setCellsArray(generatedCells);
    setSelectedColorCount(count);
    setOptionsArray(generateOptionsArray(count));
  }, []);
  
  const generateCellsArray = (color: string): [string[][], number] => {
    let tempArray: string[][]= [];
    let colorCount= 0;
    for(let column=0; column<10; column++){
      const arrayColumn: string[]= [];
      tempArray.push(arrayColumn);
      for(let row=0; row<10; row++){
        const randomColor= getRandomElement(colors);
        if(randomColor === color) colorCount++;
        tempArray[column].push(randomColor);
      }
    }
    return [tempArray, colorCount];
  };

  const generateOptionsArray = (colorCount: number): number[] => {
    let options = [];
    options.push(colorCount);
    while(options.length < 4){
      let randNumb = Math.floor(Math.random() * 7) - 3;
      if(options.indexOf(colorCount + randNumb) === -1) options.push(colorCount + randNumb);
    }
    return options.sort();
  };

  const handleClick= (e: React.MouseEvent<HTMLElement>): void => {
    if(+e.currentTarget.id === selectedColorCount) console.log('correct');  //Handle the score here
  };

  return (
    <div className='game-three'>
      <table>
        <tbody>
          {
            cellsArray.map((column, trIndex) => 
            <tr key={`tr-${trIndex}`}>
              {column.map((row, tdIndex ) => <td key={`td-${trIndex}-${tdIndex}`}><div key={`div-${trIndex}-${tdIndex}`} className='game-three__cell' style={{ backgroundColor: newColors[row as Color] }}/></td>)}
            </tr>
            )
          }
        </tbody>
      </table>
      <div className='game-three__response-options'>
        {
          optionsArray.map((option, index) => <div onClick={handleClick} key={`option-div-${index}`} id={`${option}`} className='game-three__response-options__option'>{option}</div>)
        }
      </div>
    </div>
  )
};

export default Game3;