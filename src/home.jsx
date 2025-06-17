import React, {useEffect} from 'react';
import './home.css';
import {Link} from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    const handleMouseMove = e =>{
      if (cursor) {
        cursor.style.top = e.pageY + 'px'
        cursor.style.left = e.pageX + 'px'
      }
    };

    const handleMouseDown = e =>{
      cursor?.classList.add('active');
    }

    const handleMouseUp = e =>{
      cursor?.classList.remove('active');
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
     window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
    <div className='cursor'></div>
    <div className='home'>
      <h1>Whack a Mole</h1>
      <div className='mole'></div>
      <div className='startBoard'><Link to='game' className='start'>Start</Link></div>
    </div>
    </>
  );
}