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

export {
  shuffleArray,
  getRandomElement
};