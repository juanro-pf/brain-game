import React, { useEffect, useRef, useState } from 'react';

const Game5 = () => {

  const oppositeSides= {
    'ArrowUp': 'ArrowDown',
    'ArrowDown': 'ArrowUp',
    'ArrowLeft': 'ArrowRight',
    'ArrowRight': 'ArrowLeft'
  };

  type Arrow = keyof typeof oppositeSides;

  const getRandomArrow= (arrowArray: string[]): [string, string] => {
    return [arrowArray[Math.floor(Math.random() * arrowArray.length)], ['White', 'Yellow'][Math.floor(Math.random() * 2)]];
  };

  // Below function was created because the listeners do not have access to the state https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
  const setCurrentArrowRef = (count: number): void => {
    setCurrentArrow(count);
    currentArrowRef.current= count;
  };

  const handleKey= (e: KeyboardEvent) => {
    if(arrowsArray[currentArrowRef.current] && arrowsArray[currentArrowRef.current][1] === 'Yellow' && e.key === oppositeSides[arrowsArray[currentArrowRef.current][0] as Arrow]){
      setCurrentArrowRef(currentArrowRef.current + 1);
    } else if(arrowsArray[currentArrowRef.current] && arrowsArray[currentArrowRef.current][1] === 'White' && e.key === arrowsArray[currentArrowRef.current][0]){
      setCurrentArrowRef(currentArrowRef.current + 1);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey);
    }
  }, []);
  
  const generateArrowsArray= (arrowsCount: number): string[][] => {
    const array: string[][]= [];
    for(let i=0; i<arrowsCount; i++){
      array.push(getRandomArrow(Object.keys(oppositeSides)));
    }
    return array;
  };

  const [arrowsArray, setArrowsArray] = useState(generateArrowsArray(50));
  const [currentArrow, setCurrentArrow] = useState(0);
  const currentArrowRef = useRef(currentArrow);

  return (
    <div className='game-five'>
      <div className='game-five__arrow'>{ arrowsArray[currentArrow + 2] && <i className={`fa-solid fa-arrow-${arrowsArray[currentArrow + 2][0].split('Arrow')[1].toLowerCase()}-long`} style={{ color: arrowsArray[currentArrow + 2][1] }}/> }</div>
      <div className='game-five__arrow'>{ arrowsArray[currentArrow + 1] && <i className={`fa-solid fa-arrow-${arrowsArray[currentArrow + 1][0].split('Arrow')[1].toLowerCase()}-long`} style={{ color: arrowsArray[currentArrow + 1][1] }}/> }</div>
      <div className='game-five__arrow'>{ arrowsArray[currentArrow] && <i className={`fa-solid fa-arrow-${arrowsArray[currentArrow][0].split('Arrow')[1].toLowerCase()}-long`} style={{ color: arrowsArray[currentArrow][1] }}/> }</div>
    </div>
  )
};

export default Game5;