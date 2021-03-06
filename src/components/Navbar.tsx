import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <p className='navbar__item' onClick={() => navigate('/brain-game')}>Game</p>
      <p className='navbar__item' onClick={() => navigate('/leaderboard')}>Leaderboard</p>
      <p className='navbar__item' onClick={() => navigate('/instructions')}>Instructions</p>
    </div>
  )
};

export default Navbar;