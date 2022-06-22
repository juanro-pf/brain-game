import React from 'react';
import { Link } from 'react-router-dom';

const Instructions = () => {
  return (
    <div className='instructions'>
      <h2>Overall game instructions</h2>
      <p>Complete the 10 mini games as fast as you can.</p>
      <p>Make the less mistakes as you can, as each mistake adds penalization seconds to your time.</p>
      <p>Each minigame has its own rules, its own number of levels and its own penalization seconds per mistake.</p>

      <h3>Pick the color</h3>
      <p>Click on the square of the color that is written in the top bar.</p>
      <p>{'Ignore the color of the text (except if it si black, more details explained below), you should click on the square that has the written color, not on the square that has the color of the text.'}</p>
      <p>If the color of the text is black, then click on any square of the 4 but the one that is written in the top bar.</p>
      
      <h3>Basic math</h3>
      <p>Type the result of the math opertaion and hit enter on your keyboard or click on the submit button.</p>

      
      <h3>Color count</h3>
      <p>Count the number of squares of the color that is present in the top bar and click on the correct answer.</p>

      
      <h3>Ascending numbers</h3>
      <p>Click on the numbers in ascending order.</p>

      
      <h3>Arrows</h3>
      <p>This game is played with the arrows of your keyboard.</p>
      <p>Arrows are dropping down and you have to finish with all of them by pressing the option that belongs to the arrow on the bottom.</p>
      <p>If the color of the arrow is white, then you have to press the same arrow key on your keyboard.</p>
      <p>If the color of the arrow is yellow, the you have to press the opposite arrow key in your keyboard.</p>

      <h3>Missing number</h3>
      <p>Click on the square that contains the number which is not present in the circled numbers.</p>

      <h3>Percentage</h3>
      <p>Type the result of the percentage and press enter or click on the submit button.</p>

      <h3>Fractions</h3>
      <p>Type the result of the fraction and press enter or click on the submit button.</p>

      <h3>Shuffled word</h3>
      <p>You will get a word on the top square and 4 options in the following squares.</p>
      <p>Click on the option that contains the exact same letters as the word in the top square.</p>

      <h3>Pick the side</h3>
      <p>Colors are dropping down and you have to finish with all of them by pressing the right or left arrow key in your keyboard to send the color to the side that it belongs.</p>
      <p>You will see 2 squares on each side that contain the color to which the color circles have to be sent to.</p>
      <p>If you see a color circle with a question mark in it, that means that after you send that circle to the correct side, the color of the squares will be shuffled, so check again to which side you should be sending the circles now.</p>

      <h4>Once you have gone through above instructions, you are ready to <Link to='game-mix'>play</Link>.</h4>
    </div>
  )
};

export default Instructions;