import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css'
import { useQuizContext } from './QuizContext';
import { useRouter } from 'next/router';
const Timer = () => {
  const { showResult, setShowResult } = useQuizContext()
  const initialTime = 30 * 60; // 30 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const router = useRouter()

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowResult(true)
      router.push('./result')
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className={styles.timerWrapper}>
      <p className={styles.timerHeading}>Time Remaining</p>
      <p className={styles.time}> {formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;
