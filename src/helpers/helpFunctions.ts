const getRandomElement= (array: Array<any>): typeof array[0] => {
  return array[Math.floor(Math.random() * array.length)];
};

const shuffleArray = (array: Array<any>): void => {
  let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
};

const handleRemainingLevels = (state: number, changeGame: (arg: ((bol: boolean) => boolean) | boolean) => void): number => {
  if(state === 0) {
    changeGame(old => !old);
    return state;
  }
  else return state - 1;
};

const convertCentisecondsToMinutesSecondsCentiseconds = (centiseconds: number): [string, string, string] => {
  const minutes= Math.floor(centiseconds / 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const seconds= (Math.floor(centiseconds) - (Math.floor(centiseconds / 60) * 60)).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const decimals= Math.floor  ((centiseconds % 1) * 100).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  return [minutes, seconds, decimals];
};

export {
  shuffleArray,
  getRandomElement,
  handleRemainingLevels,
  convertCentisecondsToMinutesSecondsCentiseconds
};