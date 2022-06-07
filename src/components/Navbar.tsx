import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  let navigate = useNavigate();

  return (
    <div className='navbar'>
      <p className='navbar__item' onClick={() => navigate('/game-mix')}>Game</p>
      <p className='navbar__item' onClick={() => navigate('/instructions')}>Instructions</p>
    </div>
  )
};

export default Navbar;