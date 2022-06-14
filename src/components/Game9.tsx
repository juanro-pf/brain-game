import React, { useEffect, useState } from 'react';
import { shuffleArray } from '../helpers/helpFunctions';

const Game9 = () => {

  // https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
  const shuffleString = (str: string): string => {
    let a = str.split(""), n = a.length;

    for(let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join("");
  };

  const characters= 'abcdefghijklmnopqrstuvwxyz';

  const [word, setWord] = useState('');
  const [optionsArray, setOptionsArray] = useState([['', false]]);

  useEffect(() => {
    let word: string;
    const options: [string, boolean][]= [];
    fetch(`https://palabras-aleatorias-public-api.herokuapp.com/random-by-length?length=${5}`)
      .then(response => response.json())
      .then(data => {
        word= data.body.Word.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        setWord(word);
        for(let i=0; i<3; i++){
          const replace= word[Math.floor(Math.random() * word.length)];
          options.push([shuffleString(word.replace(replace, characters.replace(replace, '')[Math.floor(Math.random() * characters.length)])), false]);
        }
        options.push([shuffleString(word), true]);
        shuffleArray(options);
        setOptionsArray(options);
      });
  }, []);

  const handleClick= (e: React.MouseEvent<HTMLElement>): void => {
    if(e.currentTarget.id === 'true') console.log('correct');  //Handle the score here
  };

  return (
    <div className='game-nine'>
      <div className='game-nine__square game-nine__square--up'>
        {word}
      </div>
      <div className='game-nine__section-down'>
        {
          optionsArray[0] && <div onClick={handleClick} id={optionsArray[0][1] ? 'true': 'false'} className='game-nine__square'>{optionsArray[0][0]}</div>
        }
        {
          optionsArray[1] && <div onClick={handleClick} id={optionsArray[1][1] ? 'true': 'false'} className='game-nine__square'>{optionsArray[1][0]}</div>
        }
      </div>
      <div className='game-nine__section-down'>
        {
          optionsArray[2] && <div onClick={handleClick} id={optionsArray[2][1] ? 'true': 'false'} className='game-nine__square'>{optionsArray[2][0]}</div>
        }
        {
          optionsArray[3] && <div onClick={handleClick} id={optionsArray[3][1] ? 'true': 'false'} className='game-nine__square'>{optionsArray[3][0]}</div>
        }
      </div>
    </div>
  )
};

export default Game9;