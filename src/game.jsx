import React, {useEffect, useState} from 'react';
import './game.css';

export default function Game(){
    const initialTime = 60*3;
    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [gameOver, setGameOver] = useState(false);


    useEffect(() => {
        if(gameOver){
          alert(`Total Score: ${score}`);
        }
        const timerInterval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime == 0){
                    clearInterval(timerInterval);
                    alert('Times Up Game Over');
                    setGameOver(true);
                    let restartboard = document.querySelector('.restartBoard');
                    if(restartboard){
                      for(let i=1; i<=15; i++){
                        let hole = document.getElementById(`hole${i}`);
                        if(hole){
                          hole.style.display = 'none';
                        }
                      }
                      restartboard.style.display='block';
                    }

                    return 0;
                }else{
                    return prevTime -1;
                }
            });
        },1000);

        return ()=> clearInterval(timerInterval);
    }, [gameOver]);

    const minutes = Math.floor((timeRemaining % 180) / 60);
    const seconds = timeRemaining % 60;

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

    useEffect(() =>{
      const interval = setInterval(() => {
        if(gameOver) return;
        // initializing board by hiding all the moles

        for(let i=1;i<=15;i++){
          let mole = document.getElementById(`mole${i}`);
          if(mole){
            mole.style.display = 'none';
          }
        }
        
        // show random mole
        let random = Math.floor(Math.random() * 15) + 1;
        const moleMove = document.getElementById(`mole${random}`);
        if(moleMove){
          moleMove.style.display = 'block';
        }
      }, 1500);

      return () => clearInterval(interval);
    }, [gameOver]);

    function Hit(e){
      if(gameOver) return;
      const mole = e.currentTarget.querySelector('img');

      if(mole && mole.style.display === 'block'){
        setScore((prevScore) => prevScore + 1);
        mole.style.display = 'none';
      }else{
        setLives((prevLives) => {
          const updatedLives = prevLives -1;

          if(updatedLives === 2){
            document.getElementById('live3').style.display = 'none';
          }else if(updatedLives === 1){
            document.getElementById('live2').style.display = 'none';
          }else if(updatedLives === 0){
            document.getElementById('live1').style.display = 'none';
            alert('Game Over');
            // alert(`Total Score: ${score}`);
            setGameOver(true);
            let restartboard = document.querySelector('.restartBoard');
            if(restartboard){
              for(let i=1; i<=15; i++){
                let hole = document.getElementById(`hole${i}`);
                if(hole){
                hole.style.display = 'none';
              }
              }
              
              restartboard.style.display='block';

            }
          }

          return Math.max(0, updatedLives);
        });
      }
    }

    function Restart(){
              return window.location.reload();
            }
    
    return(
        <>
        <div className='cursor'></div>
        <div className='topSection'>
            <div className='lives'>
                <div id='live1'></div>
                <div id='live2'></div>
                <div id='live3'></div>
            </div>
            <h3 className='timer'>Timer: {minutes}:{seconds}</h3>
            <h3 className='score'>Score: {score}</h3>
        </div>
        <div className='gameBoard'>
            <div className='hole' id='hole1' onClick={Hit}><img src='/pixelated-mole.png' id='mole1' height='100px' width='120px' alt='mole' style={{display: 'none'}}/></div>
            <div className='hole' id='hole2' onClick={Hit}><img src='/pixelated-mole.png' id='mole2' height='100px' width='120px' alt='mole' style={{display: 'none'}}/></div>
            <div className='hole' id='hole3' onClick={Hit}><img src='/pixelated-mole.png' id='mole3' height='100px' width='120px' alt='mole' style={{display: 'none'}}/></div>
            <div className='hole' id='hole4' onClick={Hit}><img src='/pixelated-mole.png' id='mole4' height='100px' width='120px' alt='mole' style={{display: 'none'}}/></div>
            <div className='hole' id='hole5' onClick={Hit}><img src='/pixelated-mole.png' id='mole5' height='100px' width='120px' alt='mole' style={{display: 'none'}}/></div>
            <div className='hole' id='hole6' onClick={Hit}><img src='/pixelated-mole.png' id='mole6' height='100px' width='120px' alt='mole' style={{display: 'none'}}/></div>
            <div className='hole' id='hole7' onClick={Hit}><img src='/pixelated-mole.png' id='mole7' height='100px' width='120px' alt='mole' style={{display: 'none'}}/></div>
            <div className='hole' id='hole8' onClick={Hit}><img src='/pixelated-mole.png' id='mole8' height='100px' width='120px' alt='mole' style={{display: 'none'}}/></div>
            <div className='hole' id='hole9' onClick={Hit}><img src='/pixelated-mole.png' id='mole9' height='100px' width='120px' alt='mole' style={{display: 'none'}}/></div>
            <div className='hole' id='hole10' onClick={Hit}><img src='/pixelated-mole.png' id='mole10' height='100px' width='120px' alt='mole' style={{display: 'none'}}/></div>
            <div className='hole' id='hole11' onClick={Hit}><img src='/pixelated-mole.png' id='mole11' height='100px' width='120px' alt='mole' style={{display: 'none'}}/></div>
            <div className='hole' id='hole12' onClick={Hit}><img src='/pixelated-mole.png' id='mole12' height='100px' width='120px' alt='mole' style={{display: 'none'}}/></div>
            <div className='hole' id='hole13' onClick={Hit}><img src='/pixelated-mole.png' id='mole13' height='100px' width='120px' alt='mole' style={{display: 'none'}}/></div>
            <div className='hole' id='hole14' onClick={Hit}><img src='/pixelated-mole.png' id='mole14' height='100px' width='120px' alt='mole' style={{display: 'none'}}/></div>
            <div className='hole' id='hole15' onClick={Hit}><img src='/pixelated-mole.png' id='mole15' height='100px' width='120px' alt='mole' style={{display: 'none'}}/></div>
        </div>

        <div className='restartBoard' role='dialog'>
          <p id='restart' onClick={Restart}>Restart</p>
        </div>
        </>
    )
}