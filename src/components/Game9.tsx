import React, { useEffect, useRef, useState } from 'react';
import { shuffleArray, handleRemainingLevels } from '../helpers/helpFunctions';

const Game9 = (props: { setPenalizationPoints: (func: ((num: number) => number) | number) => void, setGameName: (arg: ((str: string) => string) | string) => void, changeGame: (arg: ((bol: boolean) => boolean) | boolean) => void, setRemainingLevels: (func: ((num: number) => number) | number) => void }) => {

  const { setGameName, changeGame, setRemainingLevels, setPenalizationPoints }= props;

  const [internalRemainingLevels, setInternalRemainingLevel] = useState(4);
  const [shuffleAll, setShuffleAll] = useState(false);
  const tempRefValue: any= 0;
  const timerRef = useRef(tempRefValue);

  // General game useEffect
  useEffect(() => {
    setGameName('Shuffled word');
    setRemainingLevels(3);
    return () => {
      setGameName('');
      setRemainingLevels(0);
    }
  }, []);

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
  const [optionsArray, setOptionsArray] = useState([['', false], ['', false], ['', false], ['', false]]);

  useEffect(() => {
    let tempWord: string;
    const options: [string, boolean][]= [];
    timerRef.current= setInterval(() => setPenalizationPoints(old => old - .01), 10);
    fetch(`https://palabras-aleatorias-public-api.herokuapp.co/random-by-length?length=${9 - internalRemainingLevels}`)
      .then(response => response.json())
      .then(data => {
        tempWord= data.body.Word.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        setWord(tempWord);
        for(let i=0; i<3; i++){
          const replace= tempWord[Math.floor(Math.random() * tempWord.length)];
          const shuffled= shuffleString(tempWord.replace(replace, characters.replace(replace, '')[Math.floor(Math.random() * (characters.length - 1))])); //characters.length - 1 because we are replacing the character with an empty string, so the lenght dicreases in 1
          options.push([shuffled, false]);
        }
        options.push([shuffleString(tempWord), true]);
        shuffleArray(options);
        setOptionsArray(options);
        clearInterval(timerRef.current);
      })
      .catch(error => {
        console.log(error);
        console.log(internalRemainingLevels);
        const wordsArray= ["enjuagar", "proveer", "cantar", "comer"];
        tempWord= wordsArray[internalRemainingLevels - 1];
        setWord(tempWord);
        for(let i=0; i<3; i++){
          const replace= tempWord[Math.floor(Math.random() * tempWord.length)];
          const shuffled= shuffleString(tempWord.replace(replace, characters.replace(replace, '')[Math.floor(Math.random() * (characters.length - 1))])); //characters.length - 1 because we are replacing the character with an empty string, so the lenght dicreases in 1
          options.push([shuffled, false]);
        }
        options.push([shuffleString(tempWord), true]);
        shuffleArray(options);
        setOptionsArray(options);
        clearInterval(timerRef.current);
      });
    return () => {
      clearInterval(timerRef.current);
    }
  }, [internalRemainingLevels, shuffleAll]);

  const handleClick= (e: React.MouseEvent<HTMLElement>): void => {
    if(e.currentTarget.id === 'true') {
      setWord('');
      setOptionsArray([['', false], ['', false], ['', false], ['', false]]);
      setRemainingLevels(old => handleRemainingLevels(old, changeGame));
      setInternalRemainingLevel(old => old -1)
    } else if(word){
      setPenalizationPoints(old => old + 5);
      setWord('');
      setOptionsArray([['', false], ['', false], ['', false], ['', false]]);
      setShuffleAll(old => !old);
    }
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