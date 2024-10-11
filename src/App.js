import React, { useEffect, useState } from 'react'

const App = () => {
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(0);

  function handleStart() {
    if (hours < 0 || minutes < 0 || seconds <= 0) {
      alert("please enter valid time");
      return;
    }

    setIsStart(true);
  }

  function handleReset() {
    setIsStart(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerId);
  }

  function handlePause() {
    setIsPaused(true);
    clearInterval(timerId);
  }

  function handleResume() {
    setIsPaused(false);
    runTimer(seconds, minutes, hours, timerId);
  }

  function runTimer(sec, min, hrs, tid) {
    if (sec) {
      setSeconds((s) => s - 1);
    }
    else if (min) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    }
    else if (hrs) {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }

    // Stop the timer when count finishes
    if (sec === 0 && min === 0 && hrs === 0) {
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      clearInterval(tid);

      alert("TIMER FINISHED")
    }
  }

  useEffect(() => {
    let intervalId;
    if (isStart) {
      intervalId = setInterval(() => {
        runTimer(seconds, minutes, hours, intervalId);
      }, 900);
      setTimerId(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    }
  }, [isStart, hours, minutes, seconds]);

  function handleInput(e) {
    let value = parseInt(e.target.value);
    let id = e.target.id;

    console.log(id, value);

    if (id === "hours") {
      setHours(value);
    }
    else if (id === "minutes") {
      setMinutes(value);
    }
    else {
      setSeconds(value);
    }
  }

  return (
    <div className='w-screen h-[100vh] flex items-center justify-center bg-[#191919]'>

      {/* Countdown timer */}

      <div className='flex gap-5 items-center'>

        {
          !isStart ?
            <div className='flex gap-3'>
              <input
                id='hours'
                onChange={(e) => handleInput(e)}
                placeholder='HH'
                className='bg-gray-300 focus:outline-none rounded-md w-[60px] p-3 text-center'
              />
              <input
                id='minutes'
                onChange={(e) => handleInput(e)}
                placeholder='MM'
                className='bg-gray-300 focus:outline-none rounded-md w-[60px] p-3 text-center'
              />
              <input
                id='seconds'
                onChange={(e) => handleInput(e)}
                placeholder='SS'
                className='bg-gray-300 focus:outline-none rounded-md w-[60px] p-3 text-center'
              />
            </div>
            :
            <div className='flex gap-3 text-[#fff] text-3xl'>
              <div>{hours < 10 ? `0${hours}` : hours}</div>
              <div>:</div>
              <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
              <div>:</div>
              <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
            </div>
        }

        {
          !isStart ?
            <button
              className='bg-gray-400 text-lg p-3 rounded-md hover:bg-gray-500 cursor-pointer'
              onClick={() => handleStart()}
            >
              Start
            </button>
            :
            <div className='flex gap-2'>
              {
                !isPaused ?
                  <button
                    className='bg-gray-400 text-lg p-3 rounded-md hover:bg-gray-500 cursor-pointer'
                    onClick={() => handlePause()}
                  >
                    Pause
                  </button>
                  :
                  <button
                    className='bg-gray-400 text-lg p-3 rounded-md hover:bg-gray-500 cursor-pointer'
                    onClick={() => handleResume()}
                  >
                    Resume
                  </button>
              }
              <button
                className='bg-gray-400 text-lg p-3 rounded-md hover:bg-gray-500 cursor-pointer'
                onClick={() => handleReset()}
              >
                Reset
              </button>
            </div>
        }
      </div>

    </div>
  )
}

export default App
