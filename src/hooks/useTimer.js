import { useRef, useState, useCallback, useMemo } from "react";

const useTimer = () => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    setTime(0);
  }, [stopTimer]);

  const formattedTime = useMemo(() => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [time]);

  return { 
    time, 
    formattedTime,  
    startTimer, 
    stopTimer, 
    resetTimer 
  };
};

export default useTimer;